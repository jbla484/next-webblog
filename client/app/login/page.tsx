'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { validateEmail, validatePassword } from '@/utils/utils';

import Input from '@/components/input';
import Link from 'next/link';

import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

export default function Login() {
    const { push } = useRouter();

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');

    let [error, setError] = useState<string>('');

    const queryLogin = async () => {
        try {
            const query = await fetch('http://localhost:3001/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const response = await query.json();
            if (!response.error) {
                // Store token in local storage
                localStorage.setItem('token', response.token);
                setError('');
                push('/');
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col justify-center text-center h-screen'>
            <div className='mx-auto w-3/4'>
                <h1 className='text-4xl my-5'>
                    <b>Login</b>
                </h1>

                <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    setter={setEmail}
                    error='Must be a valid email address'
                    validate={validateEmail}
                ></Input>

                <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    setter={setPassword}
                    error='Must contain at least 8 characters which includes a
                    capital letter, lowercase letter, number, and
                    special character'
                    validate={validatePassword}
                ></Input>

                {error !== '' && (
                    <div className='border-solid border-2 bg-transparent rounded-md p-2 border-red-600 bg-red-300'>
                        <ul>
                            <li>{error}</li>
                        </ul>
                    </div>
                )}

                <div className='mt-2'>
                    <button
                        className='py-1.5 px-2 rounded-md bg-green-600 text-white w-full block'
                        onClick={queryLogin}
                    >
                        Login
                    </button>
                </div>

                <div className='my-4'>
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link
                            href={'/register'}
                            className='text text-blue-500 cursor-pointer underline'
                        >
                            Register
                        </Link>
                    </p>
                </div>

                <div className='flex flex-row h-12 justify-center items-center space-x-3'>
                    <FaGoogle
                        size={45}
                        className='cursor-pointer p-2 rounded-md border-2 border-solid'
                    />
                    <FaFacebookF
                        size={45}
                        className='cursor-pointer p-2 rounded-md border-2 border-solid'
                    />
                    <FaGithub
                        size={45}
                        className='cursor-pointer p-2 rounded-md border-2 border-solid'
                    />
                    <FaLinkedinIn
                        size={45}
                        className='cursor-pointer p-2 rounded-md border-2 border-solid'
                    />
                </div>
            </div>
        </div>
    );
}
