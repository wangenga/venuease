'use client';
import React, { useCallback, useMemo } from 'react';

import { SafeBooking, SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import Image from 'next/image';
import FavouriteButton from './FavouriteButton';
import Button from '../Button';
import useKenyaTowns from '@/app/hooks/useKenyaTowns';


interface ListingCardProps {
  data: SafeListing;
  booking?: SafeBooking;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  hideInclusions?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  booking,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  hideInclusions = false,
}) => {
  const router = useRouter();
  const { getTownByValue } = useKenyaTowns();
  const location = getTownByValue(data.locationValue)
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId!);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (booking) {
      return booking.totalPrice;
    }
    return data.price;
  }, [booking, data.price]);

  const bookingDate = useMemo(() => {
    if (!booking) {
      return null;
    }
    const start =  new Date(booking.startDate);
    const end =  new Date(booking.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [booking]);

  
  return (
    <div
    onClick={() => router.push(`/listings/${data.id}`)}
    className="col-span-1 cursor-pointer group"
  >
    <div className="flex flex-col gap-2 w-full">
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          alt="Listing"
          src={data.imageSrc}
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
        <div className='absolute top-3 right-3'>
            <FavouriteButton
                ListingId= {data.id}
                currentUser= {currentUser}
            />
        </div>
      </div>
      <div className="font-semibold text-lg">
        {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
        {bookingDate || data.eventType}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
              Kshs {price}
          </div>
          {!hideInclusions && (
          <div className="font-light ml-2">
              without services
          </div>
          )}
        </div>
        {onAction && actionLabel && (
        <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
        />
        )}
    </div>
  </div>
  );
};

export default ListingCard;
