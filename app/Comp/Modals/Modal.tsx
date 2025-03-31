'use client'

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
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

const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, onSubmit, title, body, footer,
    disabled, actionLabel, secondaryLabel, secondaryAction
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() =>
    {
        if (disabled) {
            return;
        }
        setShowModal(false);
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
        <div className="fixed inset-0 flex items-center justify-center z-[1100] bg-neutral-800/70">
            <div className="relative w-full h-full md:w-4/6 lg:w-3/6 xl:w-1/3 mx-auto bg-white rounded-lg shadow-lg p-6 lg:h-auto md:h-auto">
                {/* Modal Content Animation */}
                <div className={`
                translate
                duration-400
                h-full
                ${showModal ? 'translate-y-0' : 'translate-y-full'}
                ${showModal ? 'opacity-100' : 'opacity-0'}
                `}>
                    <div className="
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
                    focus:outline-none">
                    </div>
                </div>
            <div className="px-6 pt-6 ">
                {/* Close Button */}
                <button onClick={handleClose} className="absolute flex flex-row  top-4 left-4 text-gray-600 hover:text-gray-900">
                    <IoMdClose size={20} />
                    
                </button>

                    {/* Body */}
                    <div className="relative flex-auto">
                        {body}
                    </div>
                    {/* Footer */}
                    <div className="flex flex-col gap-2 py-6">
                        <div className="flex flex-row items-center gap-4 w-full">
                        {secondaryAction && secondaryLabel && (
                            <Button
                        outline
                        disabled={disabled}
                        label={secondaryLabel}
                        onClick={handleSecondaryAction}
                         />
                         )
                    }
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

export default Modal