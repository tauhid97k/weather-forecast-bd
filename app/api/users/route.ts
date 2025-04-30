import { getSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession();

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    switch (req.method) {
      case "GET":
        const users = await prisma.users.findMany({
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            stationId: true,
            division: true,
            district: true,
            upazila: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        return res.status(200).json(users);

      case "POST":
        const { email, name, role, stationId, division, district, upazila } =
          req.body;
        const newUser = await prisma.users.create({
          data: {
            email,
            name,
            role,
            stationId,
            division,
            district,
            upazila,
            emailVerified: false,
            banned: false,
          },
        });
        return res.status(201).json(newUser);

      case "PUT":
        const { id, ...updateData } = req.body;
        const updatedUser = await prisma.users.update({
          where: { id },
          data: updateData,
        });
        return res.status(200).json(updatedUser);

      case "DELETE":
        const { userId } = req.body;
        await prisma.users.delete({
          where: { id: userId },
        });
        return res.status(204).end();

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in users API:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
