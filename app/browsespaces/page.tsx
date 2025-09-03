import React from 'react';
import Container from '../Comp/Container';
import ListingCard from '../Comp/listings/ListingCard';
import getListings, { IListingsParams } from '../actions/getListings';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../Comp/EmptyState';
import Button from '../Comp/Button';
import SearchModal from '../Comp/Modals/SearchModal';

import ClientOnly from '../Comp/ClientOnly';
import FiltersButton from '../Comp/FiltersButton';
import Search from '../Comp/Search';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BrowseSpacesProps {
  searchParams: IListingsParams
}

const BrowseSpaces = async ({ searchParams }: BrowseSpacesProps) => {
   

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const isEmpty = listings.length === 0;
  if (isEmpty) {
    return(
      <EmptyState showReset/>
    )
  }
  
  
  return (
    <Container>
      <div className="pt-24">
        {/* Description added above the grid */}
        <p className="text-left text-xl font-bold mb-2">
          Available Spaces
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

export default BrowseSpaces