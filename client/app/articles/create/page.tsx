'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/input';

import Image from 'next/image';

export default function Login() {
    const { push } = useRouter();

    let [title, setTitle] = useState<string>('');
    let [description, setDescription] = useState<string>('');
    let [image, setImage] = useState<string>('');
    let [category, setCategory] = useState<string>('');

    let [error, setError] = useState<string>('');

    const queryCreateArticle = async () => {
        try {
            console.log(title, description, image, category);
            const query = await fetch('http://localhost:3001/articles/create', {
                method: 'POST',
                body: JSON.stringify({ title, description, image, category }),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const response = await query.json();
            // if (!response.error) {
            //     // Store token in local storage
            //     localStorage.setItem('token', response.token);
            //     setError('');
            //     push('/');
            // } else {
            //     setError(response.error);
            // }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col justify-center text-center h-screen'>
            <div className='mx-auto w-3/4'>
                <h1 className='text-4xl my-5'>
                    <b>Create Article</b>
                </h1>

                <Input
                    type='text'
                    placeholder='Title'
                    value={title}
                    setter={setTitle}
                ></Input>

                <Input
                    type='text'
                    placeholder='Description'
                    value={description}
                    setter={setDescription}
                ></Input>

                {/* Currently working with urls, could we do AWS S3 file upload and grab the url from there? */}
                {/* <Input
                    type='file'
                    placeholder='Image'
                    value={image}
                    setter={setImage}
                ></Input> */}

                <Input
                    type='text'
                    placeholder='Image URL'
                    value={image}
                    setter={setImage}
                ></Input>

                <Input
                    type='text'
                    placeholder='Category'
                    value={category}
                    setter={setCategory}
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
                        onClick={queryCreateArticle}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
