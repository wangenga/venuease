'use client';

import { BiSearch } from "react-icons/bi";
import useSearchModal from "../hooks/useSearch";
import { useSearchParams } from "next/navigation";
import useKenyaTowns from "../hooks/useKenyaTowns";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getTownByValue } = useKenyaTowns();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get ('startDate') ;
  const endDate = params?.get('endDate');
  const capacity = params?.get('capacity');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getTownByValue(locationValue as string)?.label;
    }

  return 'Location' ;
  }, [getTownByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string) ;
      const end = new Date(endDate as string) ;
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1
      }
      return '${diff} Days';
    }
    return 'Date'
  }, [startDate, endDate]);

  const capacityLabel = useMemo(() => {
    if (capacity) {
      return '${capacity} Guests';
    }

    return 'Add Guests'
  }, [capacity])

  return (
    <div onClick={searchModal.onOpen} className="border-1px w-full md:w-auto py-2 px-4 rounded-full shadow-sm hover:shadow-md transition cursor-pointer bg-white">
      <div className="flex flex-row items-center justify-between">
      
        <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">Where?</label>
          <div className="text-sm text-black font-semibold px-6">{locationLabel}</div>
       </div>
       <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">When?</label>
          <div className="text-sm text-black font-semibold px-6">{durationLabel}</div>
       </div>
       <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">Capacity?</label>
          <div className="text-sm text-black font-semibold px-6">{capacityLabel}</div>
       </div>
      </div>

    </div>
  );
}

export default Search;
