// app/Comp/listings/ListingBooking.tsx
'use client';
import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import ListingAdditionalServices, { Service } from "./ListingAdditionalServices";
import Button from "../Button";

interface ListingBookingProps {
  price: number; // base price per day
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  // Props for additional services selection:
  availableServices: Service[];
  selectedServices: Service[];
  onToggleService: (service: Service) => void;
}

const ListingBooking: React.FC<ListingBookingProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  availableServices,
  selectedServices,
  onToggleService,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">KSh {price}</div>
        <div className="font-light text-neutral-600">/day</div>
      </div>
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      {/* Additional Services Selector */}
      <ListingAdditionalServices
        services={availableServices}
        selectedServices={selectedServices}
        onToggleService={onToggleService}
      />
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>KSh {totalPrice}</div>
      </div>
      <Button
        onClick={onSubmit}
        disabled={disabled}
        label='Book Now'
      />
    </div>
  );
};

export default ListingBooking;
