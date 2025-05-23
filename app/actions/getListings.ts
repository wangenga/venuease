import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  capacity?: number;
  roomCount ?: number;
  bathroomCount ?: number;
  startDate ?: string;
  endDate ?: string;
  locationValue ?: string;
  eventType ?: string;

}

export default async function getListings(
  params: IListingsParams
 ) {
  try {
    const {
      userId,
      capacity,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      eventType,
    } = params;

    let query: any = {};
    if ( userId ) {
      query.userId = userId;
    }
    if ( capacity ) {
      query.capacity = {gte: +capacity};
    }
    if ( roomCount ) {
      query.roomCount = {gte: +roomCount};
    }
    if ( bathroomCount ) {
      query.bathroomCount = {gte: +bathroomCount};
    }
   
    if ( locationValue ) {
      query.locationValue = locationValue;
    }
    if ( eventType ) {
      query.eventType = eventType;
    } 
    if (startDate && endDate) {
      query.NOT = {
        bookings: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }
    

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
