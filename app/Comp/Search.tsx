'use client';


const Search = () => {
    return (
        <div className="items-center bg-white shadow-lg rounded-lg p-4 w-full mx-auto hidden sm:block">
        {/* Activity Input */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold text-sm">What Event?</label>
          <p className="mt-1 text-black font-medium">Enter your Activity</p>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg">Search</button>
          </div>
        
      
        {/* Location */}
        <div className="flex-1 px-4">
          <label className="block text-gray-700 font-semibold text-sm">Where?</label>
          <p className="mt-1 text-black font-medium">Nairobi, 05, KE</p>
        </div>
      
        {/* Date */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold text-sm">When?</label>
          <p className="mt-1 text-black font-medium">Anytime</p>
        </div>
      
        {/* Search Button */}
        <div className="flex-1">Add Guests
      </div>
      
      </div>
      
      )
}

export default Search