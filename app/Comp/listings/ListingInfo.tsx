'use client';

import useKenyaCounties from '@/app/hooks/useKenyaTowns';
import { SafeUser } from '@/app/types';
import React from 'react';
import Avatar from '../Avatar';
import ListingEventType from './ListingEventType';
import dynamic from 'next/dynamic';
import useKenyaTowns from '@/app/hooks/useKenyaTowns';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  capacity: number;
  roomCount: number;
  bathroomCount: number;
  eventType: {
    label: string;
    description: string;
  } | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  capacity,
  roomCount,
  bathroomCount,
  eventType,
  locationValue,
}) => {
  // Use the new hook to retrieve county data
  const { getTownByValue } = useKenyaTowns();
  const coordinates = getTownByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{capacity} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {eventType && (
        <ListingEventType
          label={eventType.label}
          description={eventType.description}
        />
      )}
      <hr />
      <div className="text-lg font-normal text-neutral-600">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
