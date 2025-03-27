// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser"; // Use the server action version (requires no req/res)

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { listingId, startDate, endDate, totalPrice, selectedServices } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        listingId, 
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        selectedServices: selectedServices || [],
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
