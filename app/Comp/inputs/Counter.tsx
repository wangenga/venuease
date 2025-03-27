'use client';
import React, { useCallback } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}


const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return
        }
        onChange(value - 1);
    }, [value, onChange]);

  return (
    <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
            <div className='font-medium'>{title}</div>
            <div className='font-light text-gray-400'>{subtitle}</div>
        </div>
        <div className='flex flex-row items-center gap-6 pt-2'>
            <div
                onClick={onReduce}
                className=' rounded-full border-gray-300 flex items-center justify-center text-neutral-700 cursor-pointer hover:opacity-85 transition'
            >
                <AiOutlineMinusCircle size={25} />
            </div>
            <div className='font-semibold text-lg text-neutral-700'>
                    {value}
            </div>
            <div
                onClick={onAdd}
                className='  rounded-full border-gray-300 flex items-center justify-center text-neutral-700 cursor-pointer hover:opacity-85 transition'
            >
                <AiOutlinePlusCircle size={25}/>
            </div>
            
        </div>
    </div>
  )
}

export default Counter