'use client';

import { useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import BrowseSpaces from "./BrowseSpaces";
import UserMenu from "./UserMenu";
import Modal from "./Modals/Modal";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'login' | 'signup'>('login');

    const openLoginModal = () => {
        setModalType('login');
        setIsModalOpen(true);
    };

    const openSignUpModal = () => {
        setModalType('signup');
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Modal Component */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => console.log(modalType === 'login' ? "Logging in..." : "Signing up...")}
                title={modalType === 'login' ? "Login" : "Sign Up"}
                body={
                    <div>
                        {modalType === 'login' ? (
                            <div>
                                <p>Login Form Goes Here</p>
                                <p className="mt-2 text-sm">
                                    Don't have an account? 
                                    <button
                                        className="text-blue-500 hover:underline ml-1"
                                        onClick={openSignUpModal}>
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p>Sign Up Form Goes Here</p>
                                <p className="mt-2 text-sm">
                                    Already have an account? 
                                    <button
                                        className="text-blue-500 hover:underline ml-1"
                                        onClick={openLoginModal}>
                                        Login
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                }
                footer={<div>Footer Content</div>}
                disabled={false}
                actionLabel={modalType === 'login' ? "Login" : "Sign Up"}
                secondaryLabel="Cancel"
                secondaryAction={() => setIsModalOpen(false)}
            />

            {/* Navbar */}
            <div className="fixed w-full bg-white z-10 shadow-sm py-4">
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
                            <UserMenu onLoginClick={openLoginModal} onSignUpClick={openSignUpModal} />
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Navbar;
