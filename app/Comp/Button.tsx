'use client';

import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string; // Allow custom styles to be passed
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    return (
        <button 
            onClick={onClick} 
            className={`
                px-6 py-3 
                bg-[#18306C] 
                text-white 
                rounded-md 
                hover:bg-[#152955] 
                transition-all
                w-full
                ${className || ''} // Allow external styles to override
            `}
        >
            {label}
        </button>
    );
}

export default Button;