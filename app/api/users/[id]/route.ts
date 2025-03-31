import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE a user by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
