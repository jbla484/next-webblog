// "use client"

// IMPLEMENT JWT

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next.js 14 Blog Application',
    description: 'Designed and Devloped by James Blankenship',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            {/* <html lang='en' className='min-h-screen'> */}
            <body className={inter.className + ' w-11/12 m-auto'}>
                <Navbar />
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    );
}
