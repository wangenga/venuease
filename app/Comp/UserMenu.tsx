'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from './Avatar';
import React, { useCallback, useEffect, useState } from 'react';
import MenuItem from './MenuItem';

import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import { SafeUser } from '../types';
import { signOut } from 'next-auth/react';


import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [setIsOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = () => {
            setIsOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);


    const onRent = useCallback(() =>{
        if (!currentUser) {
            return loginModal.onOpen();
        }
        router.push('/rent');
        
    }, [currentUser, loginModal, router]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    List your Spot
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}  />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <div className="px-4 py-2 font-bold text-center text-[#171666]">
                                    Hi, {currentUser.name || 'Guest'}
                                </div>
                                <MenuItem onClick={() => router.push("/events")} label="My Events" />
                                <MenuItem onClick={() => router.push("/bookings")} label="My Bookings" />
                                <MenuItem onClick={() => {}} label="My Favorites" />
                                <MenuItem onClick={() => {}} label="My Listings" />
                                <MenuItem onClick={onRent} label="List My Space" />
                                <MenuItem onClick={() => signOut()} label="Logout" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Login" />
                                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
