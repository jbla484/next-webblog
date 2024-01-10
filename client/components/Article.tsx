import React from 'react';

import { IoPersonOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { categoryIcon } from '@/utils/utils';
import { IoCalendarOutline } from 'react-icons/io5';

interface Article {
    id: string;
    img: string;
    title: string;
    author: string;
    authorid: string;
    description: string;
    category: string;
    comments: [];
    likes: [];
    created: Date;
    section: string;
    count?: number;
    total?: number;
}

export default function Article(article: Article) {
    const { push } = useRouter();

    let classList = 'flex border-b-2 pb-6 border-green-600';
    if (article.count && article.count == article.total) {
        classList = 'flex pb-6';
    }

    const renderArticle = (section: string) => {
        switch (section) {
            case 'featured':
            case 'trending':
                return (
                    <>
                        <img
                            src={article.img}
                            width={1000}
                            height={1000}
                            alt='blog post'
                            className='rounded-md'
                            onClick={(e) => {
                                push(`/articles/${article.id}`);
                            }}
                        />
                        <div
                            className='flex flex-row text-green-500 mt-2'
                            onClick={(e) => {
                                push(
                                    `/articles/categories/${article.category}`
                                );
                            }}
                        >
                            {categoryIcon(article.category)}

                            <p className='text-xs'>
                                {article.category.toUpperCase()}
                            </p>
                        </div>

                        <h1
                            className='text-2xl'
                            onClick={(e) => {
                                push(`/articles/${article.id}`);
                            }}
                        >
                            <b>{article.title}</b>
                        </h1>
                        <div
                            className='flex flex-row text-gray-700 mt-1 text-xs'
                            onClick={(e) => {
                                push(`/users/${article.authorid}`);
                            }}
                        >
                            <IoPersonOutline
                                size={18}
                                className='mr-1'
                            />
                            <p className=' text-sm'>{article.author}</p>
                        </div>
                    </>
                );
            case 'latest':
                return (
                    <div className={classList}>
                        <div className='flex-grow'>
                            <div
                                className='flex flex-row text-green-500 mt-2'
                                onClick={(e) => {
                                    push(
                                        `/articles/categories/${article.category}`
                                    );
                                }}
                            >
                                {categoryIcon(article.category)}

                                <p className='text-xs'>
                                    {article.category.toUpperCase()}
                                </p>
                            </div>

                            <h1
                                className='text-2xl'
                                onClick={(e) => {
                                    push(`/articles/${article.id}`);
                                }}
                            >
                                <b>{article.title}</b>
                            </h1>
                            <div
                                className='flex flex-row text-gray-700 mt-1 text-xs'
                                onClick={(e) => {
                                    push(`/users/${article.authorid}`);
                                }}
                            >
                                <IoCalendarOutline
                                    size={22}
                                    className='mr-2'
                                />
                                <p className='text-sm'>
                                    {new Date(
                                        article.created
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <img
                            src={article.img}
                            width={100}
                            height={100}
                            alt='blog post'
                            className=' rounded-md'
                            onClick={(e) => {
                                push(`/articles/${article.id}`);
                            }}
                        />
                    </div>
                );
        }
    };

    return (
        <div
            className='mt-6'
            key={article.id}
        >
            {renderArticle(article.section)}
        </div>
    );
}
