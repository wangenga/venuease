'use client';

import { register } from "module";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors

}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    errors
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
          text-neutral-700
          absolute
          top-5
          left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          px-4
          py-3
          font-light
          rounded-md
          bg-white
          border
          outline-none
          transition
          disabled:opacity-80
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-[#18306c]' : 'border-neutral-400'}
          ${errors[id] ? 'focus:border-[#18306C]' : 'border-gray-300'}
        `}
        />
       <label
         className={`
         absolute 
         text-md 
         duration-150 
         transform 
         -translate-y-3 
         top-3 z-10 
         origin-[0] 
         ${formatPrice ? 'left-9' : 'left-4'} 
         peer-placeholder-shown:scale-100
         peer-placeholder-shown:translate-y-0
         peer-focus:scale-75
         peer-focus:-translate-y-4
         ${errors[id] ? 'text-red-600' : 'text-black'}
         `}
        >
          {label}
        </label>
    </div>
  );
}

export default Input