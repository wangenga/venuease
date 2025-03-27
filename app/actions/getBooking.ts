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
        listing: true, 
        },
        orderBy: {
        createdAt: "desc",
        },
    });

    const safeBookings = bookings.map((booking) => ({
        ...booking,
        createdAt: booking.createdAt.toISOString(),
        startDate: booking.startDate.toISOString(),
        endDate: booking.endDate.toISOString(),
        listing: booking.listing
        ? {
            ...booking.listing,
            createdAt: booking.listing.createdAt.toISOString(),
            }
        : null, 
    }));

    return safeBookings;
    }   catch (error:any){
        throw new Error (error)
    }
}
