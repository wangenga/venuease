'use Client'
import useSearchModal from "@/app/hooks/useSearch"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import queryString from "query-string"
import { formatISO } from "date-fns"
import { TownSelectValue } from "@/app/hooks/useKenyaTowns"
import Heading from "../Heading"
import TownSelect from "../inputs/TownSelect"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"
import EventTypeInput from "../inputs/EventTypeInput"
import { eventTypes } from "../EventTypes"; 



enum STEPS {

    LOCATION = 0,
    
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
    
  const [location, setLocation] = useState<TownSelectValue>();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [capacity, setCapacity] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), [location]);

  const onBack = () => {
    setStep((value) => value - 1);
  };
            
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      eventTypes: eventTypes?.values,
      capacity,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = queryString.stringifyUrl({
      url: '/browsespaces',
      query: updateQuery
    }, {skipNull: true});

    setStep(STEPS. LOCATION) ;
    searchModal.onClose();
    router.push(url);
  },
  [
    step,
    searchModal,
    location,
    router,
    capacity,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Create";
    }
      return "Next";
  }, [step]);
              
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to have your event?"
        subtitle="Find the perfect location"
      />
      <TownSelect
        value={location}
        onChange={(value) =>
          setLocation(value as TownSelectValue)
        }
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )
 
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={ (value) => setDateRange(value . selection ) }
        />
      </ div>
    )
  }

  if (step === STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
          title="More Information?"
        />
        <Counter
          title="Guest Capacity"
          subtitle="How many guests are coming?"
          value={capacity}
          onChange={(value) => setCapacity(value)}
         />
        <hr />
        <Counter
          title="Number Of Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
         />
         <hr />
         <Counter
          title="Number Of Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
         />
         <hr />
      </div>
    )
  }

  return (
    <Modal 
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}

    />
  )
}

export default SearchModal