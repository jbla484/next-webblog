import Link from 'next/link';
import React from 'react';

interface Props {
    title: string;
    path: string;
}

export default function ArticleCategories(props: Props) {
    return (
        <div className='flex flex-row mt-4 items-center'>
            <p className=' mr-4 text-2xl font-semibold'>{props.title}</p>
            <hr className='flex-grow m-auto border-t-2 border-green-600'></hr>
            <Link
                className='ml-4 text-green-600'
                href={`/articles/categories/${props.path}`}
            >
                View All
            </Link>
        </div>
    );
}
