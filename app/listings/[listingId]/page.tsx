//app/listings/[listingId]/page.tsx
import getListingById from '@/app/api/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser'; // Import the function
import React from 'react';
import ListingClient from './ListingClient';
import getBookings from '@/app/actions/getBooking';

interface Iparams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const resolvedParams = await params;
  const { listingId } = resolvedParams;

  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();
  const bookings = await getBookings(params);
  if (!listing) {
    return <div>Return to Home Page</div>;
  }
  
  return (
    <div className="relative">
      <div className="h-20"></div>
      <ListingClient
      listing={listing}
      currentUser={currentUser}
      bookings={bookings} />
    </div>
  );
};

export default ListingPage;
