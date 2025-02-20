'use client';

import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import {
    FieldValues, SubmitHandler, useForm
} from 'react-hook-form';

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import Button from "../Button"; // Import Button component

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in successfully');
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const footerContent = (
        <div className="text-center text-sm text-gray-600 mt-4">
            <div className="justify-center flex flex-row items-center gap-2">
                <div>Don't have an account?</div>
                <div
                    onClick={() => {
                        loginModal.onClose();
                        setTimeout(() => {
                            if (!loginModal.isOpen) {
                            registerModal.onOpen();
                            }
                        }, 300);
                    }}
                    className="text-blue-600 cursor-pointer hover:underline"
                >
                    Sign up
                </div>
            </div>
        </div>
    );

    const bodyContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 h-full ">
            {/* Left Side - Everything (Form, Footer, Button) */}
            <div className="flex flex-col justify-center  md:px-1">
                <Heading title="Hello, Welcome!" subtitle="Login to your account" />

                <div className="space-y-5 mt-6">
                    <Input
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>

            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block justify-items-end">
                <img
                    src="/images/login-visual.png"
                    alt="Login"
                    className=" w-60 h-80  object-cover rounded-lg"
                />
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
