import { User, Listing, Booking } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "emailVerified" | "createdAt" | "updatedAt"
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SafeBooking = Omit<
  Booking,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  endDate: string;
  startDate: string;
  listing: SafeListing;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
