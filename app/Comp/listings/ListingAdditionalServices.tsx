// app/Comp/listings/ListingAdditionalServices.tsx
'use client';
import React from "react";

export type Service = {
  name: string;
  price: number; // we assume price is a number here for calculations
};

interface ListingAdditionalServicesProps {
  services: Service[]; // available services from the listing
  selectedServices: Service[]; // currently selected services
  onToggleService: (service: Service) => void;
}

const ListingAdditionalServices: React.FC<ListingAdditionalServicesProps> = ({
  services,
  selectedServices,
  onToggleService,
}) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Additional Services</h3>
      <div className="space-y-2">
        {services.map((service) => {
          const isSelected = selectedServices.some(
            (s) => s.name === service.name
          );
          return (
            <label key={service.name} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleService(service)}
              />
              <span>
                {service.name} – KSh {service.price}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ListingAdditionalServices;
