'use client';

import useKenyaCounties from '@/app/hooks/useKenyaTowns';
import { SafeUser } from '@/app/types';
import React from 'react';
import Heading from '../Heading';
import FavouriteButton from './FavouriteButton';
import Image from 'next/image';
import useKenyaTowns from '@/app/hooks/useKenyaTowns';

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getTownByValue } = useKenyaTowns();
  const location = getTownByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <FavouriteButton ListingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

