'use client'

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface LargeModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    disabled?: boolean;
    actionLabel: string;
    secondaryLabel?: string;
    secondaryAction?: () => void;
}

const LargeModal: React.FC<LargeModalProps> = ({
    isOpen, onClose, onSubmit, title, body, footer,
    disabled, actionLabel, secondaryLabel, secondaryAction
}) => {
    const [showLargeModal, setShowLargeModal] = useState(isOpen);
    useEffect(() => {
        setShowLargeModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() =>
    {
        if (disabled) {
            return;
        }
        setShowLargeModal(false);
        setTimeout(() =>{
            onClose();
        },400);
    }, [disabled, onClose]);

   const handleSubmit = useCallback(()=>
    {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(()=>
        {
            if (disabled || !secondaryAction) {
                return;
            }
            secondaryAction();
        }, [disabled, secondaryAction]);

        if(!isOpen) {
            return null;
        }

  return (
    <div className="relative w-full min-h-screen bg-neutral-200/70 flex items-center justify-center ">
        <div className=" w-full md:w-5/6 lg:w-5/6 xl:w-5/6 mx-auto bg-white py-4 my-9 px-8 shadow-sm rounded-lg ">
            {/* Modal Content*/}
            <div
            className={`
            translate
            duration-400
            h-full
            ${showLargeModal ? 'translate-y-0' : 'translate-y-full'}
            ${showLargeModal ? 'opacity-100' : 'opacity-0'}
            `}>
                <div
                    className="
                        translate
                        h-full
                        lg:h-auto
                        md:h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        w-full
                        bg-white
                        outline-none
                        focus:outline-none
                    ">
                </div>
            </div>
            <div className="px-6 pt-2 pb-3">
                {title && (
                    <div className=" flex items-center justify-center">
                        <h2 className="text-2xl font-bold text-[#18306C] ">{title}</h2>
                    </div>
                )}
                <hr className="w-full border-t border-gray-200 my-5" />
                {/* Body */}
                <div className="relative flex-auto">
                    {body}
                </div>
                 {/* Footer */}
                 <div className="flex flex-col gap-2 pt-10">
                    <div className="flex flex-row items-center gap-4 w-50%">
                        {secondaryAction && secondaryLabel && (
                            <Button
                                outline
                                disabled={disabled}
                                label={secondaryLabel}
                                onClick={handleSecondaryAction}
                            />
                        )}
                        <Button
                        disabled={disabled}
                        label={actionLabel}
                        onClick={handleSubmit}
                        />
                    </div>
                    {footer}
                </div>

        </div>
    </div>
</div>
);
}

export default LargeModal