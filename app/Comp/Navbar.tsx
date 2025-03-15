'use client';

import React, { useState } from "react";

import Container from "./Container";
import Logo from "./Logo";
import BrowseSpaces from "./BrowseSpaces";
import UserMenu from "./UserMenu";
import { SafeUser } from "../types";
import EventTypes from "./EventTypes";
import HeroSection from "./HeroSection";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
}) => {

    return (
        <>

            {/* Navbar */}
            <div className="fixed w-full bg-white z-10 shadow-sm">
                <div className="py-4 border-b-[1px]">
                    <Container>
                        <div className="flex flex-row items-center justify-between gap-6 md:gap-4">
                            {/* Logo Section */}
                            <div className="mr-auto">
                                <Logo />
                            </div>

                            {/* Browse Spaces Section */}
                            <div className="flex-grow flex justify-end">
                                <BrowseSpaces />
                            </div>

                            {/* User Menu */}
                            <UserMenu currentUser={currentUser}/>

                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Navbar;
