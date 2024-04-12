'use client';

import { categoryIcon } from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';

import Article from '../../../../components/Article';

// TODO: we need to move this into the article component???

interface Params {
    category: string;
}

interface Article {
    _id: string;
    image: string;
    title: string;
    author: string;
    authorid: string;
    created: Date;
    description: string;
    likes: [];
    comments: [];
    category: string;
}

export default function Categories({ params }: { params: Params }) {
    const { push } = useRouter();
    const { category } = params;
    const [articles, setArticles] = useState([]);
    console.log(category);

    useEffect(() => {
        const getArticles = async () => {
            try {
                // query the backend to get the articles with the provided category
                const query = await fetch(
                    `http://192.168.1.28:3001/articles/categories/${category}`
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
                            <Article
                                id={article._id}
                                img={article.image}
                                title={article.title}
                                author={article.author}
                                authorid={article.authorid}
                                description={article.description}
                                category={article.category}
                                comments={article.comments}
                                likes={article.likes}
                                created={article.created}
                                section='category'
                            />
                        </div>
                    );
                })}
        </div>
    );
}
