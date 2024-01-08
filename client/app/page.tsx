'use client';

import Link from 'next/link';

import Button from '@/components/button';

import Image from 'next/image';
import trees from '../public/trees.jpg';

import { useEffect, useState } from 'react';

import { IoHardwareChipOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';

interface Article {
    img: any; // need to change this to StaticImageData
    title: string;
    author: string;
    description: string;
}

let Article = (article: Article) => {
    // const navigateToArticle = (event) => {
    //     console.log('todo: navigate to article!');
    // };
    // const navigateToCategory = (event: MouseEvent) => {
    //     console.log('todo: navigate to category!');
    // };
    // const navigateToAuthor = (event: MouseEvent) => {
    //     console.log('todo: navigate to author!');
    // };
    return (
        <div className='mt-6'>
            <Image
                src={article.img}
                alt='blog post'
                onClick={(e) => {
                    console.log('todo: navigate to article!');
                    // navigateToArticle(e);
                }}
            ></Image>
            <div
                className='flex flex-row text-green-500 my-2'
                onClick={(e) => {
                    console.log('todo: navigate to category!');
                    // navigateToCategory(e);
                }}
            >
                <IoHardwareChipOutline size={22} className='mr-1 ' />
                <p className='text-sm'>{'hardware'.toUpperCase()}</p>
            </div>

            <h1
                className='text-xl mt-1'
                onClick={(e) => {
                    console.log('todo: navigate to article!');
                    // navigateToArticle(e);
                }}
            >
                <b>{article.title}</b>
            </h1>
            <div
                className='flex flex-row text-gray-700 my-2'
                onClick={(e) => {
                    console.log('todo: navigate to author!');
                    // navigateToAuthor(e);
                }}
            >
                <IoPersonOutline size={22} className='mr-1' />
                <p className=' text-sm'>{article.author}</p>
            </div>
            {/* <div className='mb-2'>
                <p className='inline mr-4'>{post.author}</p>
                <p className='inline text-gray-400'>
                    {new Date().toUTCString()}
                </p>
            </div> */}
            {/* <div className='mb-5'>
                <span>Tags: </span>
                <span className='bg-green-600 p-1 rounded-md mx-1 text-white'>
                    Business
                </span>
                <span className='bg-green-600 p-1 rounded-md mx-1 text-white'>
                    Energy
                </span>
                <span className='bg-green-600 p-1 rounded-md mx-1 text-white'>
                    Home
                </span>
            </div> */}
            {/* <p className='mb-5'>{post.description}</p> */}
        </div>
    );
};

export default function Home() {
    let [featuredContent, setFeaturedContent] = useState({});

    useEffect(() => {
        let getFeaturedContent = async () => {
            const query = await fetch('http://localhost:3001/');
            const response = await query.json();
            console.log(response);
        };

        getFeaturedContent();
    }, []);

    return (
        <div className='flex flex-col justify-center text-start min-h-screen font-sans'>
            <div className='flex flex-row mt-16 items-center'>
                <p className=' mr-4 text-2xl font-semibold'>Featured</p>
                <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
            </div>
            <Article
                img={trees}
                title='Full house battery backup coming this summer'
                author='James Blankenship'
                description='Today is a special launch event, home eco power pro Newegg
                launched a series of new products, including a "Whole home
                backup solution"'
            />
            <Article
                img={trees}
                title='Full house battery backup coming this summer'
                author='James Blankenship'
                description='Today is a special launch event, home eco power pro Newegg
                launched a series of new products, including a "Whole home
                backup solution"'
            />

            <div className='flex flex-row mt-4 items-center'>
                <p className=' mr-4 text-2xl font-semibold'>Latest</p>
                <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
            </div>
            <Article
                img={trees}
                title='Full house battery backup coming this summer'
                author='James Blankenship'
                description='Today is a special launch event, home eco power pro Newegg
                launched a series of new products, including a "Whole home
                backup solution"'
            />
            <Article
                img={trees}
                title='Full house battery backup coming this summer'
                author='James Blankenship'
                description='Today is a special launch event, home eco power pro Newegg
                launched a series of new products, including a "Whole home
                backup solution"'
            />

            <div>
                <button className='py-1.5 mt-4 mb-2 px-2 rounded-md border-2 border-solid w-1/2 block m-auto border-black text-black'>
                    Load More
                </button>
            </div>

            <div className='flex flex-row mt-4 items-center'>
                <p className=' mr-4 text-2xl font-semibold'>Trending</p>
                <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
            </div>
            <Article
                img={trees}
                title='Full house battery backup coming this summer'
                author='James Blankenship'
                description='Today is a special launch event, home eco power pro Newegg
                launched a series of new products, including a "Whole home
                backup solution"'
            />
            <Article
                img={trees}
                title='Full house battery backup coming this summer'
                author='James Blankenship'
                description='Today is a special launch event, home eco power pro Newegg
                launched a series of new products, including a "Whole home
                backup solution"'
            />

            {/* <div className='m-auto w-3/4'>
                <h1 className='text-4xl'>
                    <b>WebBlog</b>
                </h1>
                <p className='mt-4 mb-8'>
                    Create a profile, write blogs, follow other authors, and
                    like / favorite articles with this unique blogging
                    application.{' '}
                </p>
                <Button path='/login' title='Login' outline={false} />
                <Button path='/register' title='Get Started' outline={true} />
            </div> */}
        </div>
    );
}
