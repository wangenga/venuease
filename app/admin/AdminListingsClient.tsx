'use client';

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/Comp/Button";
import { SafeListingExtended } from "@/app/types";
import ExportPdfButton from "../Comp/ExportPdfButton";
import AdminListingsReport from "./AdminListingsReport";

interface AdminListingsClientProps {
  initialListings: SafeListingExtended[];
}

const AdminListingsClient: React.FC<AdminListingsClientProps> = ({ initialListings }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [listings, setListings] = useState<SafeListingExtended[]>(initialListings);

  const handleDeleteListing = async (id: string) => {
    const response = await fetch(`/api/listings/${id}`, { method: "DELETE" });
    if (response.ok) {
      console.log(`Listing ${id} deleted successfully`);
      setListings(listings.filter((listing) => listing.id !== id));
      router.refresh();
    } else {
      console.error("Failed to delete listing");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Listings</h1>
      <div className="flex py-3 flex-row justify-between">
        
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Location</th>
            <th className="border p-2 text-left">Date Created</th>
            <th className="border p-2 text-left">Bookings</th>
            <th className="border p-2 text-left">Owner</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <tr key={listing.id} className="text-center">
                <td className="border p-2">{listing.title}</td>
                <td className="border p-2">{listing.locationValue}</td>
                <td className="border p-2">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">{listing._count.bookings}</td>
                <td className="border p-2">
                  {listing.user ? `${listing.user.name} (${listing.user.email})` : "N/A"}
                </td>
                <td className="border p-2">
                  <Button
                    onClick={() => handleDeleteListing(listing.id)}
                    label="Delete"
                    className=" text-white p-1"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No listings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListingsClient;
