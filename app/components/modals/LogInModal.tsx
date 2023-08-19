'use client';

import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useSignUpModal from '@/app/hooks/useSignUpModal';
import useLogInModal from '@/app/hooks/useLogInModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const LoginModal = () => {
    const router = useRouter();

    const signUpModal = useSignUpModal();
    const logInModal = useLogInModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { email: '', password: '' },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', { ...data, redirect: false }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in successfully!');
                router.refresh();
                logInModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const toggle = useCallback(() => {
        logInModal.onClose();
        signUpModal.onOpen();
    }, [logInModal, signUpModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Log in to your account!' />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                signUp={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                signUp={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <div className='flex items-center my-4 text-xs'>
                <div className='block w-full h-px mr-4 bg-[#ddd]'></div>
                or
                <div className='block w-full h-px ml-4 bg-[#ddd]'></div>
            </div>
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with GitHub'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='mt-4 text-center text-neutral-500 font-light'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>First time using Airbnb?</div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={logInModal.isOpen}
            title='Log in'
            actionLabel='Continue'
            onClose={logInModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
