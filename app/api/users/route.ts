import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST to add a new user
export async function POST(req: Request) {
  const { name, email } = await req.json();
  const newUser = await prisma.user.create({ data: { name, email } });
  return NextResponse.json(newUser, { status: 201 });
}
