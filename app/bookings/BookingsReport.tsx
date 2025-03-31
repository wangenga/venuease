'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/app/Comp/Container';
import Heading from '@/app/Comp/Heading';
import getBookings from '../actions/getBooking';
import { SafeBooking, SafeUser } from '@/app/types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Button from '@/app/Comp/Button';

interface BookingsReportProps {
  currentUser?: SafeUser | null;
}

const BookingsReport: React.FC<BookingsReportProps> = ({ currentUser }) => {
  const [bookings, setBookings] = useState<SafeBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings when component mounts
  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getBookings({}); // Fetch all bookings
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Function to download the report as a PDF
  const downloadPDF = async () => {
    const reportElement = document.getElementById('report-content');
    if (!reportElement) {
      alert('Report content not found');
      return;
    }
    try {
      const canvas = await html2canvas(reportElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('bookings-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Container>
      <div className="py-4 flex flex-col md:flex-row items-center justify-between">
        <Heading title="Bookings Report" subtitle="Summary of your bookings" />
        <div className="mt-4 md:mt-0">
          <Button 
            label="Download Report as PDF" 
            onClick={downloadPDF} 
            outline
          />
        </div>
      </div>
      <div id="report-content" className="mt-8 overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name of Place</th>
                <th className="border p-2">Owner</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Dates</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Services</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="border p-2">{booking.listing.title}</td>
                  <td className="border p-2">{booking.listing.user.name}</td>
                  <td className="border p-2">{booking.listing.locationValue}</td>
                  <td className="border p-2">
                    {new Date(booking.startDate).toLocaleDateString()} -{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">KSh {booking.totalPrice}</td>
                  <td className="border p-2">
                    {booking.selectedServices && Array.isArray(booking.selectedServices)
                      ? (booking.selectedServices as any[]).map((service, idx) => (
                          <div key={idx}>
                            {service.name} (KSh {service.price})
                          </div>
                        ))
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
};

export default BookingsReport;
