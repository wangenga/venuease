// app/trips/page.tsx (or wherever your TripsPage is located)
import EmptyState from "../Comp/EmptyState";
import ClientOnly from "../Comp/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getBookings from "../actions/getBooking";
import EventsClient from "./EventsClient";

const EventsPage = async () => {
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

  const bookings = await getBookings({ userId: currentUser.id });

  if (bookings.length === 0) {
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
      <EventsClient
        bookings={bookings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default EventsPage;
