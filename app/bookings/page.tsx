import EmptyState from "../Comp/EmptyState";
import ClientOnly from "../Comp/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getBookings from "../actions/getBooking";
import BookingsClient from "./BookingsClient";

const BookingsPage = async () => {
    const currentUser = await getCurrentUser();

    if ( !currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const bookings = await getBookings({
        authorId: currentUser.id
    });

    if (bookings. length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No bookings found"
                    subtitle="Looks like you have no bookings on your listings"
                />
            </ ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <BookingsClient
                bookings={bookings}
                currentUser={currentUser}
            />
        </ ClientOnly>
    )
};

export default BookingsPage;