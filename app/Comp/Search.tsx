'use client';

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (

    

    <div className="border-1px w-full md:w-auto py-2 px-4 rounded-full shadow-sm hover:shadow-md transition cursor-pointer bg-white">
      <div className="flex flex-row items-center justify-between">
      <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">Event Type?</label>
          <div className="text-sm text-black font-semibold px-6">Event</div>
       </div>
        <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">Where?</label>
          <div className="text-sm text-black font-semibold px-6">Location</div>
       </div>
       <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">When?</label>
          <div className="text-sm text-black font-semibold px-6">Date</div>
       </div>
       <div className=" flex-col flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">Capacity?</label>
          <div className="text-sm text-black font-semibold px-6">Add Guests</div>
       </div>
      </div>

    </div>
  );
}

export default Search;
