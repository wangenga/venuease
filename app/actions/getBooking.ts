import prisma from "@/lib/prisma";

interface Iparams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

import { SafeBooking, SafeListing } from "@/app/types";

export default async function getBookings(params: Iparams): Promise<SafeBooking[]> {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const bookings = await prisma.booking.findMany({
      where: query,
      include: {
        listing: {
          include: { 
            user: true, // Include the owner of the listing
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeBookings: SafeBooking[] = bookings
      .filter((booking) => booking.listing !== null)
      .map((booking) => {
        const safeListing: SafeListing = {
          ...(booking.listing as any),
          createdAt: booking.listing!.createdAt.toISOString(),
        };

        return {
          ...booking,
          createdAt: booking.createdAt.toISOString(),
          startDate: booking.startDate.toISOString(),
          endDate: booking.endDate.toISOString(),
          // listing is guaranteed non-null after filter
          listing: safeListing,
        } as unknown as SafeBooking;
      });

    return safeBookings;
  } catch (error: any) {
    throw new Error(error);
  }
}
