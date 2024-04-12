'use client';

import Link from 'next/link';
import Button from '@/components/button';
import trees from '../public/trees.jpg';

import { useEffect, useState } from 'react';
import Article from '@/components/Article';

import { v4 as uuidv4 } from 'uuid';

interface Articles {
    _id: string;
    authorid: string;
    category: string;
    image: string;
    title: string;
    author: string;
    created: Date;
    description: string;
    likes: [];
    comments: [];
}

export default function Home() {
    const [featuredContent, setFeaturedContent] = useState([]);
    const [latestContent, setLatestContent] = useState([]);
    const [trendingContent, setTrendingContent] = useState([]);

    useEffect(() => {
        const getFeaturedContent = async () => {
            try {
                const query = await fetch(
                    'http://192.168.1.28:3001/articles/featured'
                );
                const response = await query.json();
                setFeaturedContent(response);
            } catch (error) {
                console.error(error);
            }
        };
        const getLatestContent = async () => {
            try {
                const query = await fetch(
                    'http://192.168.1.28:3001/articles/latest'
                );
                const response = await query.json();
                setLatestContent(response);
            } catch (error) {
                console.error(error);
            }
        };
        const getTrendingContent = async () => {
            try {
                const query = await fetch(
                    'http://192.168.1.28:3001/articles/trending'
                );
                const response = await query.json();
                setTrendingContent(response);
            } catch (error) {
                console.error(error);
            }
        };

        getFeaturedContent();
        getLatestContent();
        getTrendingContent();
    }, []);

    return (
        <div className='min-h-screen '>
            <div className='lg:flex lg:flex-row'>
                <div className='flex flex-col justify-center text-start font-sans lg:w-2/3 lg:mr-20'>
                    <div className='flex flex-row mt-16 items-center'>
                        <p className=' mr-4 text-2xl font-semibold'>Featured</p>
                        <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
                    </div>
                    {featuredContent &&
                        featuredContent.map((content: Articles, i: number) => {
                            // TODO: if article 2 and 3, then grid size half size
                            if (i < 3) {
                                return (
                                    <div key={uuidv4()}>
                                        <Article
                                            id={content._id}
                                            img={content.image}
                                            title={content.title}
                                            author={content.author}
                                            authorid={content.authorid}
                                            description={content.description}
                                            category={content.category}
                                            comments={content.comments}
                                            likes={content.likes}
                                            created={content.created}
                                            section='featured'
                                        />
                                    </div>
                                );
                            }
                        })}
                </div>

                <div className='flex flex-col justify-start text-start font-sans lg:w-1/3 lg:mt-12'>
                    {/* TODO: move this to the right 1/3rd when the screen is lg: */}
                    <div className='flex flex-row mt-4 items-center'>
                        <p className=' mr-4 text-2xl font-semibold'>Latest</p>
                        <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
                        {/* <button className='pl-4 rounded-md  block m-auto text-green-600'>
                            Load More
                        </button> */}
                    </div>
                    {latestContent &&
                        latestContent.map((content: Articles, i: number) => {
                            if (i < 6) {
                                return (
                                    <div key={uuidv4()}>
                                        <Article
                                            id={content._id}
                                            img={content.image}
                                            title={content.title}
                                            author={content.author}
                                            authorid={content.authorid}
                                            description={content.description}
                                            category={content.category}
                                            comments={content.comments}
                                            likes={content.likes}
                                            created={content.created}
                                            section='latest'
                                            count={i + 1}
                                            total={latestContent.length}
                                        />
                                    </div>
                                );
                            }
                        })}

                    <div>
                        <button className='py-1.5 mt-4 mb-2 px-2 rounded-md border-2 border-solid w-1/2 block m-auto border-black text-black'>
                            Load More
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center text-start font-sans'>
                <div className='flex flex-row mt-4 items-center'>
                    <p className=' mr-4 text-2xl font-semibold'>Trending</p>
                    <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
                </div>
                <div className='lg:grid lg:grid-cols-5 lg:gap-8'>
                    {trendingContent &&
                        trendingContent.map((content: Articles, i: number) => {
                            if (i < 5) {
                                return (
                                    <div key={uuidv4()}>
                                        <Article
                                            id={content._id}
                                            img={content.image}
                                            title={content.title}
                                            author={content.author}
                                            authorid={content.authorid}
                                            description={content.description}
                                            category={content.category}
                                            comments={content.comments}
                                            likes={content.likes}
                                            created={content.created}
                                            section='trending'
                                        />
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
        </div>
    );
}
