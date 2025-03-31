'use client';
import React from 'react';
import Select from 'react-select';
import  useKenyaTowns, { TownSelectValue } from '@/app/hooks/useKenyaTowns';


interface TownSelectProps {
  value?: TownSelectValue;
  onChange: (value: TownSelectValue) => void;
}

const TownSelect: React.FC<TownSelectProps> = ({ value, onChange }) => {
  const { getAllTowns } = useKenyaTowns();
  const options = getAllTowns();


  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as TownSelectValue)}
        formatOptionLabel={(option: TownSelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              {option.label}, <span className="text-gray-400 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-sm',
          option: () => 'text-lg',
        }}
      />
    </div>
  );
};

export default TownSelect;
