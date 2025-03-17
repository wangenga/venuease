'use client';
import useCountries from '@/app/hooks/useCountries';
import React from 'react'
import Select from 'react-select';


export type CountrySelectValue = {
    value: string;
    label: string;
    flag: string;
    latlng: number[];
    region: string;
};
interface CounrtySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}
const CountrySelect: React.FC<CounrtySelectProps> = ({ 
    value,
    onChange
    }) => {
        const {getAll} = useCountries();

        return (
            <div>
                <Select placeholder = "Anywhere"
                isClearable
                options = {getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option : CountrySelectValue) => (
                    <div className='flex flex-row items-center gap-3'>
                        <img
                            src={option.flag}
                            alt={option.label}
                            className="w-6 h-4 object-cover"
                        />
                        <div>{option.label}, {' '}
                        <span className='text-gray-400 ml-1'>{option.region}</span>
                        </div>
                    </div>
                )}
                menuPortalTarget={document.body}
                    // Set a high z-index for the dropdown portal to ensure it appears on top
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}

                classNames= {{
                    control: () => 'p-3 border-2',
                    input : () => 'text-sm',
                    option: () => 'text-lg'
                }}
                />
                
            </div>
        );
    };

export default CountrySelect;