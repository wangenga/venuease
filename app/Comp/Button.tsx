'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    className?: string; // Allow custom styles to be passed
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;

}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, disabled, outline, small, icon: Icon }) => {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            className={`
                relative
                px-6 py-3  
                rounded-lg
                hover:opacity-90
                disabled:opacity-70
                disabled:cursor-not-allowed
                transition
                w-full
                ${outline ? 'bg-white' : 'bg-[#18306C]'}
                ${outline ? 'border-black' : 'border-[#18306C]'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'py-1':'py-3'}
                ${small ? 'text-sm':'text-md'}
                ${small ? 'font-light':'font-semibold'}
                ${small ? 'border-[1px]':'border-[2px]' }
                ${className || ''} // Allow external styles to override
            `}
        >
            {Icon && (
                <Icon
                size={24}
                className="
                absolute
                left-4
                top-3
                "
                />
            )}
            {label}
        </button>
    );
}

export default Button;