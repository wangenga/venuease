import EmptyState from "../Comp/EmptyState";
import ClientOnly from "../Comp/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;


const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No favorites found" 
          subtitle="Looks like you have no favorite listing." 
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        listings = {listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
