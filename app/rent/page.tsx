"use client";

import { u}
import React, { useMemo, useState } from "react";
import Container from "../Comp/Container";
import RentModal from "../Comp/Modals/RentModal";


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



const Rent: React.FC<RentProps> = ({
  actionLabel, secondaryAction, secondaryLabel
}) =>{
  const [step, setStep] = useState(STEPS.EVENTTYPE)

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
  
   
  return (
    <div>
        <div className="h-20"></div>
        <RentModal
          isOpen={true}
          onClose={() => {}}
          onSubmit={() => {}}
          title="Create Event"
          actionLabel={actionLabel}
          secondaryAction={step === STEPS.EVENTTYPE ? undefined : on Back}
          secondaryLabel={secondaryActionLabel}
          disabled={false}
          />
          
       
    </div>
  );
};

export default Rent;

