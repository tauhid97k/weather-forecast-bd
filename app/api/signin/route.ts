import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Your prisma singleton
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and Password are required." }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    // Login successful
    return NextResponse.json(
      { message: "Signed in successfully.", user: { id: user.id, email: user.email, username: user.username } },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SIGNIN_ERROR]", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
