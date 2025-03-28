'use client';

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';

import { SafeBooking, SafeUser } from '../types'

import Container from '../Comp/Container';
import Heading from '../Comp/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../Comp/listings/ListingCard';

interface EventsClientProps {
    bookings: SafeBooking[];
    currentUser?: SafeUser | null;
}

const EventsClient: React.FC<EventsClientProps> = ({
    bookings, currentUser
}) => {
    const router = useRouter();
    const [ deletingId, setDeletingId ] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/bookings/${id}`)

        .then(() => {
            toast.success("Booking Cancelled");
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error)
        })
        .finally(() => {
            setDeletingId('');
        });
    }, [router])
  return (
    <>
        <div className='pt-24'></div>
        <Container>
            <Heading 
                title='Events'
                subtitle='Your current and and future events'
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 " >
                {bookings.map((booking) => (
                    <ListingCard
                    key={booking.id}
                    data={booking.listing}
                    booking={booking}
                    actionId={booking.id}
                    onAction={onCancel}
                    disabled={deletingId === booking.id}
                    actionLabel="Cancel Event"
                    currentUser={currentUser}
                    hideInclusions={true} // Hide "without inclusions"
                    />
                ))}
                </div>
        </Container>
    </>
  )
}

export default EventsClient