'use client';

import React from 'react';

interface Params {
    userid: string;
}

export default function User({ params }: { params: Params }) {
    const { userid } = params;
    return (
        <div>
            <div>{userid}</div>
            <div>{userid}</div>
            <div>{userid}</div>
            <div>{userid}</div>
            <div>{userid}</div>
            <div>{userid}</div>
        </div>
    );
}
