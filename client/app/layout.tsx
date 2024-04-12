'use client';

// IMPLEMENT JWT

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import { useState } from 'react';
import { UserContext } from '@/components/UserContext';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Next.js 14 Blog Application',
//     description: 'Designed and Devloped by James Blankenship',
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let [userLoggedIn, setUserLoggedIn] = useState(false);
    let [username, setUsername] = useState('Guest');

    return (
        <html lang='en'>
            {/* <html lang='en' className='min-h-screen'> */}
            <body className='w-11/12 m-auto'>
                {/* <body className={inter.className + ' w-11/12 m-auto'}> */}

                <UserContext.Provider
                    value={{
                        userLoggedIn,
                        setUserLoggedIn,
                        username,
                        setUsername,
                    }}
                >
                    <Navbar />
                    {children}
                    {/* <Footer /> */}
                </UserContext.Provider>
            </body>
        </html>
    );
}
