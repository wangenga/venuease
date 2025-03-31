'use client'

import React, { useCallback } from "react"
import Image from 'next/image'
import { useRouter, useSearchParams } from "next/navigation"
import qs from 'query-string'
import { eventTypes } from "./EventTypes"

interface CategoryBoxProps {
    label: string
    image: string
    selected?: boolean
    }

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    image,
    selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() =>{
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      eventType: label
    }

    if (params?.get('eventType') === label) {
      delete updatedQuery.eventType;
    }

    const url = qs.stringifyUrl({
      url: '/browsespaces',
      query: updatedQuery
    },{ skipNull: true });

    router.push(url);
  },[label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={` 
        flex flex-col items-center justify-center w-40 h-40 p-4 bg-white hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'border-2 border-neutral-800' : 'border border-neutral-200'}
        ${selected ? 'text-[#8383AE]' : 'text-[#171666]'}
      `}
    >
        <Image className="rounded-full" height="30" width="30" alt="Avatar" 
            src={image} />
        <div className="font-medium text-sm text-center mt-2">{label}</div>

    </div>
  )
}

export default CategoryBox