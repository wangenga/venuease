'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import {
    FieldValues, SubmitHandler, useForm
} from 'react-hook-form';

import useAddUserModal from "../hooks/useAddUserModal";
import Modal from "../Comp/Modals/Modal";
import Input from "../Comp/inputs/Input";
import toast from "react-hot-toast";


const AddUserModal = () => {

    const addUserModal = useAddUserModal();
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
                toast.success('Success!')
                addUserModal.onClose();
                
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

    

  return (
    <Modal
    disabled={isLoading}
    isOpen={addUserModal.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={addUserModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
  )
}

export default AddUserModal