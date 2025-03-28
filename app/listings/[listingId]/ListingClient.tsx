'use client'
import Container from '@/app/Comp/Container';
import { eventTypes } from '@/app/Comp/EventTypes';
import ListingBooking from '@/app/Comp/listings/ListingBooking';
import ListingHead from '@/app/Comp/listings/ListingHead';
import ListingInfo from '@/app/Comp/listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser,SafeListing, SafeBooking } from '@/app/types';
import axios from 'axios';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import { Service } from '@/app/Comp/listings/ListingAdditionalServices';
import { Range } from 'react-date-range';


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
    bookings? :SafeBooking[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    bookings = [],
    currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() =>{
    let dates: Date[] = [];

    bookings.forEach((booking) =>{
      const range = eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [bookings]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const availableServices: Service[] = Array.isArray(listing.additionalServices)
    ? listing.additionalServices as Service[]
    : [];

  const onCreateBooking = useCallback(() => {
    if (!currentUser) {
      // If user is not logged in, open the login modal
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios.post('/api/bookings', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId:listing?.id,
      selectedServices,
    })
    .then(() => {
      toast.success("Listing Reserved!");
      setDateRange(initialDateRange);
      setSelectedServices([]);
      router.push('/events');
    })
    .catch((error) => {
      console.error(error);
      toast.error("Something went wrong.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [currentUser, loginModal, totalPrice, dateRange, listing?.id, selectedServices]);
  
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // Calculate the number of calendar days (inclusive)
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate) + 1;
      
      // Calculate base price: days * listing.price
      let basePrice = listing.price ? dayCount * listing.price : listing.price;
      
      // Sum the cost of selected additional services
      const additionalCost = selectedServices.reduce((sum, service) => {
        return sum + Number(service.price);
      }, 0);
      
      setTotalPrice(basePrice + additionalCost);
    }
  }, [dateRange, listing.price, selectedServices]);
  


  const eventType = useMemo(() => {
    return eventTypes.find((item) =>
      item.label === listing.eventType);
  }, [listing.eventType]);

  const handleServiceToggle = (service: Service) => {
    setSelectedServices(prev => {
      // If already selected, remove it; otherwise, add it.
      const exists = prev.find(s => s.name === service.name);
      if (exists) {
        return prev.filter(s => s.name !== service.name);
      }
      return [...prev, service];
    });
  };


  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user= {listing.user}
              eventType={eventType}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              capacity={listing.capacity}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingBooking
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateBooking}
                disabled={isLoading}
                disabledDates={disabledDates}
                availableServices={availableServices}
                selectedServices={selectedServices}
                onToggleService={handleServiceToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient