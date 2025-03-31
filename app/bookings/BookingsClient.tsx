'use client';
import React, { useCallback, useState } from 'react'
import Container from '../Comp/Container'
import Heading from '../Comp/Heading'
import { SafeBooking, SafeUser } from '../types'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../Comp/Button';
import ListingCard from '../Comp/listings/ListingCard';

interface BookingsClientProps{
  bookings: SafeBooking[];
  currentUser?: SafeUser | null;
}

const BookingsClient: React.FC<BookingsClientProps> = ({
  bookings, currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(' ');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/bookings/${id}`)

    .then(() => {
        toast.success("Booking Cancelled");
        router.refresh();
    })
    .catch((error) => {
        toast.error('Something went wrong.')
    })
    .finally(() => {
        setDeletingId('');
    });
}, [router])
  return (
    <>
       <div className='pt-24'></div>
        <Container>
            <div className="flex items-center justify-between">
                <Heading 
                    title='Events'
                    subtitle='Your current and future events'
                />
                <div>
                    <Button 
                        outline
                        className="w-auto px-4" 
                        label="View Report"
                        onClick={() => {}}
                        
                    />
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 " >
                {bookings.map((booking) => (
                    <ListingCard
                    key={booking.id}
                    data={booking.listing}
                    booking={booking}
                    actionId={booking.id}
                    onAction={onCancel}
                    disabled={deletingId === booking.id}
                    actionLabel="Cancel Guest Booking"
                    currentUser={currentUser}
                    hideInclusions={true}
                    />
                ))}
                </div>
        </Container>
    </>
  )
}

export default BookingsClient