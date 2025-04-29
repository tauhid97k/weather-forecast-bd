import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, role, password, division, district, upazila } = body;

    // Basic Validation
    if (!username || !email || !role || !password || !division) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already registered." }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        role,
        division,
        district, 
        upazila,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: { id: user.id, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
