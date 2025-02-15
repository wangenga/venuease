'use client';

import React from "react";

interface HeadingProps{
    title: string;
    subtitle?: string
    center?: boolean;
}

const Heading: React.FC<HeadingProps> =({
    title,
    subtitle,
    center
}) => {
  return (
    <div>
        <div className="text-3xl font-regular text-[#171666] opacity-85 pt-2">
            {title}
        </div>
        <div className="text-2xl font-bold text-[#171666] opacity-85 mb-1">
            {subtitle}
        </div>
   </div>
  )
}

export default Heading