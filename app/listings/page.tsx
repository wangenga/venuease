import EmptyState from "../Comp/EmptyState";
import ClientOnly from "../Comp/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ListingsClient from "./ListingsClient";

const ListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized" 
          subtitle="Please login" 
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No Event found" 
          subtitle="Looks like you haven't booked any venue." 
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingsClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingsPage;
