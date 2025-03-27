'use client';

import React from 'react'
import { useRouter } from 'next/navigation';

const BrowseSpaces = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/browsespaces');
  };

  return (
    <div 
      onClick={handleClick}
      className="
      border-[1px]
      w-full
      md:w-auto
      py-2
      transition
      shadow-sm
      rounded-full
      hover:shadow-md
      cursor-pointer">
        <div className="
        flex flex-row items-center justify-end gap-7">
            <div className="
            text-sm
            font-semibold
            px-6">
                Browse Spaces
            </div>
        </div>
    </div>
  )
}

export default BrowseSpaces