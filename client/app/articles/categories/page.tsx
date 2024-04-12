'use client';

import ArticleCategories from '@/components/ArticleCategories';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Categories() {
    // render articles info
    return (
        // Add article count for each category, maybe with top article?
        <div className='mt-16 flex flex-col justify-center text-center'>
            <h1 className='text-3xl'>
                <b>Categories</b>
            </h1>

            <ArticleCategories
                title='Tech'
                path='tech'
            />
            <ArticleCategories
                title='Food'
                path='food'
            />
            <ArticleCategories title='Entertainment' />
            <ArticleCategories title='Health' />
            <ArticleCategories title='Money' />
            <ArticleCategories title='Home & Garden' />
            <ArticleCategories title='Relationships' />
            <ArticleCategories title='Deals' />
            <ArticleCategories title='Hacks' />
        </div>
    );
}
