'use client';

import React from 'react';
import Link from 'next/link';

import Search from './search';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// icons
import { IoSearchCircle } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { MdNotificationsActive } from 'react-icons/md';
import { MdOutlineArticle } from 'react-icons/md';
import { MdSignpost } from 'react-icons/md';

export default function Navbar() {
    const { push } = useRouter();

    let [searchBarVisible, setSearchBarVisible] = useState(false);

    // move to home component
    let [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        // TODO: create a popup when token expires
        let verifyToken = async () => {
            const query = await fetch('http://localhost:3001/verify', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const response = await query.json();
            if (!response.error) {
                setUserLoggedIn(true);
            } else {
                console.log('user login expired');
                // TODO: tell the user their login timed out and ask them to login again?
                setUserLoggedIn(false);
            }
        };
        verifyToken();
    }, []);

    let toggleSearchVisibility = () => {
        setSearchBarVisible(!searchBarVisible);
    };

    return (
        <nav className='flex flex-row w-11/12 h-12 justify-end items-center fixed bg-white'>
            <MdSignpost
                size={30}
                className='cursor-pointer text-green-600'
            />
            <Link
                href='/'
                className='mr-auto ml-1 text-green-600 text-xl'
            >
                <b>WebBlog</b>
            </Link>

            {userLoggedIn ? (
                <div className='flex justify-center items-center'>
                    {searchBarVisible && <Search />}
                    {/* <IoSearchCircle
                        size={30}
                        className='cursor-pointer text-gray-500'
                        onClick={toggleSearchVisibility}
                    /> */}

                    <MdOutlineArticle
                        size={30}
                        className='ml-4 cursor-pointer'
                        onClick={() => {
                            push('/articles/create');
                        }}
                    />
                    <IoNotifications
                        size={30}
                        className='ml-4 cursor-pointer'
                    />
                    {/* <MdNotificationsActive
                        size={30}
                        className='ml-4 text-gray-500'
                    /> */}
                    <MdAccountCircle
                        size={30}
                        className='ml-4 cursor-pointer'
                    />
                </div>
            ) : (
                <>
                    <Link
                        href='/login'
                        className='py-1.5 px-2 '
                    >
                        Login
                    </Link>
                    <Link
                        href='/register'
                        className='py-1.5 px-2 '
                    >
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
}
