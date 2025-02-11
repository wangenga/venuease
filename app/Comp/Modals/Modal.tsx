'use client'

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body: React.ReactElement;
    footer: React.ReactElement;
    disabled: boolean;
    actionLabel: string;
    secondaryLabel: string;
    secondaryAction: () => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, onSubmit, title, body, footer,
    disabled, actionLabel, secondaryLabel, secondaryAction
}) => {
    const [showModal, setShowModal] = useState(false);
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-800/70 ">
    <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 bg-white rounded-lg shadow-lg p-6">
        {/* Modal Content - Split Layout */}
        <div className="grid grid-cols-2">
            {/* Left Section (Form) */}
            <div className="px-6 pt-9 ">
                {/* Close Button */}
                <button onClick={handleClose} className="absolute top-4 left-4 text-gray-600 hover:text-gray-900">
                    <IoMdClose size={20} />
                </button>

                {/* Welcome Text */}
                <h2 className="text-3xl font-regular text-[#171666] opacity-85 pt-7">HELLO,</h2>
                <h2 className="text-2xl font-bold text-[#171666] opacity-85 mb-6">WELCOME!</h2>

                {/* Login Form */}
                <form className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Remember me?</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <Button label="Login" onClick={onSubmit} />

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don’t have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Signup</a>
                    </p>
                </form>
            </div>

            {/* Right Section (Image) */}
            <div className="hidden md:block">
                <img src="../images/login-visual.png" alt="Login Visual" className="h-full w-full object-cover rounded-r-lg" />
            </div>
        </div>
    </div>
</div>
);
}

export default Modal