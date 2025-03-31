"use client";

import React, { useEffect, useState } from "react";
import LargeModal from "../Comp/Modals/LargeModal";
import { useMemo } from "react";
import Heading from "../Comp/Heading";
import { eventTypes } from "../Comp/EventTypes";
import EventTypeInput from "../Comp/inputs/EventTypeInput";
import { FieldValues, useForm, SubmitHandler, useFieldArray, FormProvider} from "react-hook-form";
import { title } from "process";
import { watch } from "fs";
import CountrySelect from "../Comp/inputs/TownSelect";
import dynamic from "next/dynamic";
import Counter from "../Comp/inputs/Counter";
import ImageUpload from "../Comp/inputs/ImageUpload";
import Input from "../Comp/inputs/Input";
import axios from "axios";
import ServicesInput from "../Comp/inputs/ServicesInput";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import TownSelect from "../Comp/inputs/TownSelect";


enum STEPS {
  EVENTTYPE = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
  SERVICES = 6,
}

export default function Rent() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.EVENTTYPE);
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<FieldValues>({
    defaultValues: {
      eventType: "",
      location: "",
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      description: "",
      title: "",
      capacity: 1,
      price: "",
      additionalServices: [],
    },
  });
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = formMethods;
  

  const eventType = watch("eventType");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const capacity = watch("capacity");
  const description = watch("description");
  const title = watch("title");
  const services = watch("services");
  const price = watch("price");

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.SERVICES) {
      onNext(); // Correctly call onNext() to advance the step
      return;
    }
    setIsLoading(true);
    axios.post("/api/listings", data)
      .then(() => {
        toast.success('Listing Created!');
        router.refresh();  // <-- Make sure to call refresh as a function
        reset();
        setStep(STEPS.EVENTTYPE);
        router.push('/');
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
        
  const actionLabel = useMemo(() => {
    if (step === STEPS.SERVICES) {
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
          title="Where is your place located?(County)"
        />
        <TownSelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}/>
        <Map 
          center={location?.latlng}
        />
      </div>
    )
  }

  if (step === STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
          title="Some information about your place?"
        />
        <Counter
          title="Guest Capacity"
          subtitle="How many guests can your place accommodate?"
          value={capacity}
          onChange={(value) => setCustomValue('capacity', value)}
         />
        <hr />
        <Counter
          title="Number Of Rooms"
          subtitle="How many rooms does your place have ?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
         />
         <hr />
         <Counter
          title="Number Of Bathrooms"
          subtitle="How many bathrooms does your place have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
         />
         <hr />
      </div>
    )
  }

  if (step === STEPS.IMAGE){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload an image of your place"
        />
        <ImageUpload
          value = {imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your place"
        />
        <Input 
          id="title"
          label="Title"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <hr />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
      </div>  
    )
  }

  if (step === STEPS.PRICE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How much do you charge per day?"
        />
        <Input 
          id="price"
          label="Price"
          formatPrice
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
      </div>
    )
  }

  if (step === STEPS.SERVICES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="What services do you offer?"
          subtitle="How much does each cost"
        />
        <FormProvider {...formMethods}>
          <ServicesInput />
        </FormProvider>
      </div>
    )
  }
  


  return (
    <div className="relative">
      <div className="h-16"></div>
      <LargeModal
        isOpen={true}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
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

 