'use client';

import { categoryIcon } from '@/utils/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';

interface Params {
    category: string;
}

interface Article {
    image: string;
    title: string;
    author: string;
    created: Date;
    description: string;
    likes: [];
    comments: [];
    category: string;
}

export default function Categories({ params }: { params: Params }) {
    const { category } = params;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            try {
                // query the backend to get the articles with the provided category
                const query = await fetch(
                    `http://localhost:3001/articles/categories/${category}`
                );
                const response = await query.json();
                setArticles(response);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        getArticles();
    }, [category]);

    // render articles info
    return (
        // creates issue with navbar
        <div className='mt-16'>
            <div className='flex'>
                <Link href='/'>Home</Link>
                <p className='mx-2'>&#x2192;</p>
                <Link href='/articles/categories'>Categories</Link>
                <p className='mx-2'>&#x2192;</p>
                <Link
                    href='/articles/categories/tech'
                    className='text-green-600'
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
            </div>
            {articles &&
                articles.map((article: Article) => {
                    return (
                        <div
                            key={article.description}
                            className='flex flex-col justify-center text-left'
                        >
                            <img
                                src={article.image}
                                width={1000}
                                height={1000}
                                alt='blog post'
                                className='mt-4'
                            />
                            <div className='flex flex-row text-green-500 mt-2'>
                                {categoryIcon(article.category)}
                                <p className='text-sm'>
                                    {article.category.toUpperCase()}
                                </p>
                            </div>

                            <h1 className='text-xl mt-1'>
                                <b>{article.title}</b>
                            </h1>
                            <div className='flex flex-row text-gray-700 my-2'>
                                <IoPersonOutline size={22} className='mr-1' />
                                <p className=' text-sm'>{article.author}</p>

                                <IoCalendarOutline
                                    size={22}
                                    className='mr-2 ml-4'
                                />
                                <p className='text-sm'>
                                    {new Date(
                                        article.created
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
