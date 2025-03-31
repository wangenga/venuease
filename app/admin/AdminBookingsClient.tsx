'use client';

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/Comp/Button";
import { SafeBooking, SafeUser, SafeListing } from "@/app/types";

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  listing: SafeListing & {
    user: {
      name: string;
      email: string;
    };
  } | null;
  user: SafeUser | null;
}

interface AdminBookingsClientProps {
  initialBookings: Booking[];
}

const AdminBookingsClient: React.FC<AdminBookingsClientProps> = ({
  initialBookings,
}) => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleDeleteBooking = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`Booking ${id} deleted successfully`);
        setBookings(bookings.filter((booking) => booking.id !== id));
        router.refresh();
      } else {
        console.error("Failed to delete booking", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }, [bookings, router]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Bookings</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Listing Name</th>
            <th className="border p-2 text-left">Owner</th>
            <th className="border p-2 text-left">Booked By</th>
            <th className="border p-2 text-left">Start Date</th>
            <th className="border p-2 text-left">Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id} className="text-center">
                <td className="border p-2">
                  {booking.listing ? booking.listing.title : "N/A"}
                </td>
                <td className="border p-2">
                  {booking.listing && booking.listing.user
                    ? `${booking.listing.user.name} (${booking.listing.user.email})`
                    : "N/A"}
                </td>
                <td className="border p-2">
                  {booking.user
                    ? `${booking.user.name} (${booking.user.email})`
                    : "N/A"}
                </td>
                <td className="border p-2">
                  {new Date(booking.startDate).toLocaleDateString()}
                </td>
                <td className="border p-2">Ksh {booking.totalPrice}</td>
                <td className="border p-2">
                  <Button
                    onClick={() => handleDeleteBooking(booking.id)}
                    label="Delete"
                    className=" text-white p-1"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingsClient;
