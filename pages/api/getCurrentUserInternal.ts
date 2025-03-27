// pages/api/getCurrentUserInternal.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SafeUser } from "@/app/types";


export async function getCurrentUserInternal(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<SafeUser | null> {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified
        ? currentUser.emailVerified.toISOString()
        : null,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}