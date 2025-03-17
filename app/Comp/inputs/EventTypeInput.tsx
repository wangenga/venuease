'use client';

import React from "react";

interface EventTypeInputProps {
    label: string;
    selected? : boolean;
    onClick: (value: string) => void;
}

const EventTypeInput: React.FC<EventTypeInputProps> = ({
    label, selected, onClick
}) => {
  return (
    <div
  onClick={() => onClick(label)}
  className={`
    rounded-lg
    border-2
    items-center
    justify-center
    p-4
    flex
    flex-col
    gap-2
    hover:border-[#383883]
    transition
    cursor-pointer
    ${selected ? 'border-[#383883]' : 'border-gray-200'}
  `}
>
  <div className=" text-gray-800 hover:text-[#383883]">
    {label}
  </div>
</div>

  )
}

export default EventTypeInput