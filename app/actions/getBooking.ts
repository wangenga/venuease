import prisma from "@/lib/prisma";

interface Iparams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getBookings(params: Iparams) {
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

    const safeBookings = bookings
      .filter((booking) => booking.listing !== null)
      .map((booking) => ({
        ...booking,
        createdAt: booking.createdAt.toISOString(),
        startDate: booking.startDate.toISOString(),
        endDate: booking.endDate.toISOString(),
        listing: booking.listing
          ? {
              ...booking.listing,
              createdAt: booking.listing.createdAt.toISOString(),
              // Include the user as-is or map it to your safe user type if needed:
              user: booking.listing.user,
            }
          : null,
      }));

    return safeBookings;
  } catch (error: any) {
    throw new Error(error);
  }
}
