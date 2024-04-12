'use client';

import { categoryIcon } from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';

interface Params {
    authorid: string;
}

interface Articles {
    articleid: string;
}

interface Favorites {
    articleid: string;
}

interface Author {
    articles: Articles[];
    avatar: string;
    created: Date;
    email: string;
    favorites: Favorites[];
    fullname: string;
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

export default function Article({ params }: { params: Params }) {
    const { push } = useRouter();
    const { authorid } = params;

    const [author, setAuthor] = useState<Author>({
        articles: [],
        avatar: '',
        created: new Date(),
        email: '',
        favorites: [],
        fullname: '',
    });

    const [articles, setArticles] = useState([]);

    const [owner, setOwner] = useState<boolean>(
        sessionStorage.getItem('authorid') === authorid
    );

    // get article info
    useEffect(() => {
        const getAuthor = async () => {
            try {
                const query = await fetch(
                    `http://192.168.1.28:3001/authors/${authorid}`
                );
                const response = await query.json();
                console.log(response);
                setAuthor(response[0]);
            } catch (error) {
                console.error(error);
            }
        };
        getAuthor();

        const getArticlesByAuthor = async () => {
            try {
                const query = await fetch(
                    `http://192.168.1.28:3001/articles/author/${authorid}`
                );
                const response = await query.json();
                console.log(response);
                setArticles(response);
            } catch (error) {
                console.error(error);
            }
        };
        getArticlesByAuthor();
    }, [authorid]);

    // render article info
    return (
        <>
            {author && (
                <div className='flex flex-col text-center justify-center'>
                    <div className='m-auto mt-16'>
                        <img
                            src={author.avatar}
                            width={150}
                            height={150}
                            alt='gravatar image'
                            className='my-2 rounded-full'
                        />
                    </div>

                    <h1 className='mt-6 mb-3 text-3xl'>
                        <b>{author.fullname}</b>
                    </h1>
                    <h1 className='mb-4'>
                        <b className='text-lg'>Embedded Software Engineer</b>
                    </h1>
                    <p className='text-md'>
                        James Blankenship is the designer, developer, and owner
                        of WebBlog. He graduated with a BS in Software
                        Development from WGU, where he specialized in writing
                        code. He lives in Oregon.
                    </p>

                    {owner && (
                        <button
                            className='mt-2 bg-green-600 text-white block  text-center justify-center py-2 px-4 rounded-md'
                            onClick={(e) => push(`/authors/${authorid}/edit`)}
                        >
                            Edit Profile
                        </button>
                    )}

                    {/* <h1>{author.role}</h1> */}
                    {/* <h1>{author.description}</h1> */}

                    <div className='flex flex-row mt-4 items-center'>
                        <p className=' mr-4 text-2xl font-semibold'>
                            Articles By Name
                        </p>
                        <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
                    </div>

                    <div>
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
                                            className='mt-4 rounded-md'
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
                                            <IoPersonOutline
                                                size={22}
                                                className='mr-1'
                                            />
                                            <p className=' text-sm'>
                                                {article.author}
                                            </p>

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
                </div>
            )}
        </>
    );
}
