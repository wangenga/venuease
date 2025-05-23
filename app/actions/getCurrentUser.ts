// app/actions/getCurrentUser.ts
import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SafeUser } from "@/app/types";

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    // In the App Router (server components), getServerSession doesn't need req/res.
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return null;
    }

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
