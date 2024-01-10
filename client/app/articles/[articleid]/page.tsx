'use client';

import { categoryIcon } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';

interface Params {
    articleid: string;
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

// TODO: why are we getting an error here>?
export default function Article({ params }: { params: Params }) {
    const { articleid } = params;

    const [article, setArticle] = useState<Article>({
        image: '',
        title: '',
        author: '',
        created: new Date(),
        description: '',
        likes: [],
        comments: [],
        category: '',
    });

    // get article info
    useEffect(() => {
        const getArticle = async () => {
            try {
                const query = await fetch(
                    `http://localhost:3001/articles/${articleid}`
                );
                const response = await query.json();
                setArticle(response[0]);
            } catch (error) {
                console.error(error);
            }
        };
        getArticle();
    }, [articleid]);

    // render article info
    return (
        <div className='flex flex-col justify-center text-left min-h-screen'>
            <img
                src={article.image}
                width={1000}
                height={1000}
                alt='blog post'
                className='mt-20'
            />
            <div className='flex flex-row text-green-500 my-2'>
                {categoryIcon(article.category)}
                <p className='text-sm'>{article.category.toUpperCase()}</p>
            </div>

            <h1 className='text-xl mt-1'>
                <b>{article.title}</b>
            </h1>
            <div className='flex flex-row text-gray-700 my-2'>
                <IoPersonOutline
                    size={22}
                    className='mr-1'
                />
                <p className=' text-sm'>{article.author}</p>

                <IoCalendarOutline
                    size={22}
                    className='mr-2 ml-4'
                />
                <p className='text-sm'>
                    {new Date(article.created).toLocaleDateString()}
                </p>
            </div>

            <p className='text-xl mt-1'>{article.description}</p>
            <p className='text-xl mt-1'>Likes: {article.likes}</p>
            <p className='text-xl mt-1'>Comments: {article.comments}</p>
        </div>
    );
}
