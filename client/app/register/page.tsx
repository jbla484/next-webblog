'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateFullname,
} from '@/utils/utils';

import Input from '@/components/input';
import Link from 'next/link';

function Register() {
    const { push } = useRouter();

    let [fullname, setFullname] = useState<string>('');
    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');

    let [error, setError] = useState<string>('');

    const queryRegister = async () => {
        if (password !== confirmPassword) {
            return setError('Passwords dont match');
        }

        try {
            const query = await fetch('http://192.168.1.28:3001/register', {
                method: 'POST',
                body: JSON.stringify({ fullname, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const response = await query.json();
            if (!response.error) {
                setError('');
                push('/login');
            } else {
                setError(response.error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='flex flex-col justify-center text-center h-screen'>
            <div className='m-auto w-3/4'>
                <h1 className='text-4xl my-5'>
                    <b>Register</b>
                </h1>

                <Input
                    type='text'
                    placeholder='Full name'
                    value={fullname}
                    setter={setFullname}
                    error='Must be a valid full name'
                    validate={validateFullname}
                ></Input>

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

                <Input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    value2={password}
                    setter={setConfirmPassword}
                    error='Must match the exact password above'
                    validate={validateConfirmPassword}
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
                        onClick={queryRegister}
                    >
                        Register
                    </button>
                </div>

                <div className='mt-4'>
                    <p>
                        Already have an account?{' '}
                        <Link
                            href={'/login'}
                            className='text text-blue-500 cursor-pointer underline'
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
