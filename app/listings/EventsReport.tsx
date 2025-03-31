// app/events/EventsReport.tsx
'use client';

import React from 'react';
import Container from '@/app/Comp/Container';
import Heading from '@/app/Comp/Heading';
import DownloadReportButton from '../Comp/DownloadReportButton';

const EventsReport: React.FC = () => {
  // Example static data; replace with your dynamic data as needed
  const totalEvents = 20;
  const totalAttendees = 450;
  const revenue = 150000;

  return (
    <Container>
      <div className="py-4 flex justify-between items-center">
        <Heading title="Events Report" subtitle="Summary of your events" />
        <DownloadReportButton />
      </div>
      <div id="report-content" className="mt-8 space-y-4 p-4 border rounded">
        <div>Total Events: {totalEvents}</div>
        <div>Total Attendees: {totalAttendees}</div>
        <div>Total Revenue: KSh {revenue}</div>
        {/* You can add more detailed report content here */}
      </div>
    </Container>
  );
};

export default EventsReport;
