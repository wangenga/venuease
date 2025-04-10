'use client';

import React from "react";
import { SafeListingExtended } from "@/app/types";

interface AdminListingsReportProps {
  listings: SafeListingExtended[];
}

const AdminListingsReport = React.forwardRef<HTMLDivElement, AdminListingsReportProps>(
  ({ listings }, ref) => {
    return (
      <div ref={ref} id="report-container">
        <h1 className="text-3xl font-bold mb-4">Listings Report</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Location</th>
              <th className="border p-2 text-left">Date Created</th>
              <th className="border p-2 text-left">Bookings</th>
              <th className="border p-2 text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="text-center">
                <td className="border p-2">{listing.title}</td>
                <td className="border p-2">{listing.locationValue}</td>
                <td className="border p-2">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">{listing._count?.bookings ?? 0}</td>
                <td className="border p-2">
                  {listing.user ? `${listing.user.name} (${listing.user.email})` : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);


AdminListingsReport.displayName = 'AdminListingsReport';

export default AdminListingsReport;
