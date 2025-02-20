'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import {
    FieldValues, SubmitHandler, useForm
} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading ] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something Went Wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading
                title= 'Hello Welcome!'
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div
            className="
            text-center text-sm text-gray-600 mt-4"
        >
            <div className="justify-center flex flex-row items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div
                onClick={() => {
                    registerModal.onClose(); // Close Register Modal
                    setTimeout(() => {
                        if (!registerModal.isOpen) {
                        loginModal.onOpen();
                        }
                }, 300);
                }}
                className="
                text-blue-600
                cursor-pointer
                hover:underline"
                >
                    Log in
                </div>
            </div>

        </div>
    )

  return (
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal