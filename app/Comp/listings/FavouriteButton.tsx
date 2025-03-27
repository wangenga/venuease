'use client';

import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import useFavourite from "@/app/hooks/useFavourites";

interface FavouriteButtonProps {
  ListingId: string;
  currentUser?: SafeUser | null;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ ListingId, currentUser }) => {
  const { hasFavourited, toggleFavourite } = useFavourite({
    listingId: ListingId,
    currentUser,
  });
  
  return (
    <button 
      onClick={toggleFavourite} 
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      {hasFavourited ? (
        <AiFillStar size={28} className="fill-rose-400" />
      ) : (
        <AiOutlineStar size={28} className="fill-white" />
      )}
    </button>
  );
};

export default FavouriteButton;
