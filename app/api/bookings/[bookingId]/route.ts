import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  bookingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error(); // Returns a 401 Unauthorized response.
  }

  const { bookingId } = params;
  if (!bookingId || typeof bookingId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const booking = await prisma.booking.deleteMany({
      where: {
        id: bookingId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error removing booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
