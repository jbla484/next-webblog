'use client';

import React, { useContext } from 'react';
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

import { UserContext } from './UserContext';

export default function Navbar() {
    const { push } = useRouter();

    let [searchBarVisible, setSearchBarVisible] = useState(false);
    const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);

    useEffect(() => {
        let verifyToken = async () => {
            const query = await fetch('http://192.168.1.28:3001/verify', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const response = await query.json();
            if (!response.error) {
                setUserLoggedIn(true);
            } else {
                console.log('user login expired');
                // TODO: create a popup when token expires, on whatever page the user is on?
                // TODO: tell the user their login timed out and ask them to login again? modal?
                setUserLoggedIn(false);
            }
        };
        verifyToken();
    }, []);

    const toggleSearchVisibility = () => {
        setSearchBarVisible(!searchBarVisible);
    };

    const navigateToAuthor = () => {
        push(`/authors/${sessionStorage.getItem('authorid')}`);
    };

    return (
        <nav className='flex flex-row w-11/12 h-12 justify-end items-center fixed bg-white top-0'>
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
                        onClick={navigateToAuthor}
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
