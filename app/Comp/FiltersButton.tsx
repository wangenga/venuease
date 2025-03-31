// app/Comp/FiltersButton.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

const FiltersButton: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-48 my-4">
        <Button 
        outline 
        label="Remove all filters" 
        onClick={() => router.push('/browsespaces')}
        className="w-auto px-4"
        />
    </div>
  );
};

export default FiltersButton;
