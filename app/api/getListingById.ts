// app/api/getListingById.ts
import prisma from "@/lib/prisma";

interface IParams {
  listingId?: string;
}

export default async function getListingById({ listingId }: IParams) {
  try {
    if (!listingId) return null;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified
          ? listing.user.emailVerified.toISOString()
          : null,
      },
    };
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
}
