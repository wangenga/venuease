import React from 'react';
import Container from '../Comp/Container';
import ListingCard from '../Comp/listings/ListingCard';
import getListings from '../actions/getListings';
import getCurrentUser from '../actions/getCurrentUser';

export default async function BrowseSpaces() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div className="pt-24">
        {/* Description added above the grid */}
        <p className="text-left text-xl font-bold mb-2">
          All Spaces Available
        </p>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <ListingCard 
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
