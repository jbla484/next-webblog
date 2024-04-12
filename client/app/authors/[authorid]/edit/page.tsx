'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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

export default function Article({ params }: { params: Params }) {
    const { authorid } = params;

    const [author, setAuthor] = useState<Author>({
        articles: [],
        avatar: '',
        created: new Date(),
        email: '',
        favorites: [],
        fullname: '',
    });

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
    }, [authorid]);

    // render article info
    return (
        <>
            {author && (
                <div className='flex flex-col text-center justify-center'>
                    {/* name, role, description */}

                    <h1 className='mt-6 mb-3 text-3xl'>
                        <b>{author.fullname}</b>
                    </h1>
                    <h1 className='mb-4'>
                        {/* <b className='text-lg'>{author.role}</b> */}
                    </h1>
                    <h1 className='mb-4'>
                        {/* <b className='text-lg'>{author.description}</b> */}
                    </h1>
                </div>
            )}
        </>
    );
}
