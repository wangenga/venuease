"use client";

import React, { useEffect, useState } from "react";
import LargeModal from "../Comp/Modals/LargeModal";
import { useMemo } from "react";
import Heading from "../Comp/Heading";
import { eventTypes } from "../Comp/EventTypes";
import EventTypeInput from "../Comp/inputs/EventTypeInput";
import { FieldValues, useForm } from "react-hook-form";
import { title } from "process";
import { watch } from "fs";
import CountrySelect from "../Comp/inputs/CountrySelect";
import dynamic from "next/dynamic";


enum STEPS {
  EVENTTYPE = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  CAPACITY = 5,
  SERVICES = 6,
  PRICE = 7,

}
export default function Rent() {

  const [step, setStep] = useState(STEPS.EVENTTYPE);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
    

  } = useForm<FieldValues>({
    defaultValues: {
      eventType: "",
      location: "",
      roomCount: "",
      bathroomCount: "",
      imageSrc: "",
      description: "",
      title: "",
      capacity: "",
      services: "",
      price: "",
    },
  });

  const eventType = watch("eventType");
  const location = watch("location");

  const Map = useMemo(() => dynamic(() => import ("../Comp/Map"), {
    ssr: false
  }), [location]);

  const setCustomValue = (id: string, value: any) => {

    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  };

  const onClose = () => {
    console.log("Modal closed");
    // You can add any additional close behavior here.
  };
      
  const onBack = () => {
    setStep((value) => value - 1);
  };
        
  const onNext = () => {
    setStep((value) => value + 1);
  };
        
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
      return "Next";
  }, [step]);
        
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.EVENTTYPE) {
      return undefined;
    }
      return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Select the type of event you are hosting"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventTypes.map((item) => (
          <div
            key={item.label}
            className="col-span-1"
          >
            <EventTypeInput
              onClick={(eventType) => setCustomValue("eventType", eventType)}
              selected={eventType === item.label}
              label={item.label}
            />
            
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?(Country)"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}/>
        <Map 
          center={location?.latlng}
        />
      </div>
    )
  }
  


  return (
    <div className="relative">
      <LargeModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onNext}
        title="Create A Listing"
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.EVENTTYPE ? undefined : onBack}
        secondaryLabel={secondaryActionLabel}
        disabled={false}
        body={bodyContent}
       /> 
    </div>
  );
}

 