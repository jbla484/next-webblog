import Link from 'next/link';
import React from 'react';

interface Button {
    path: string;
    title: string;
    outline: boolean;
}

export default function Button(props: Button) {
    return (
        <Link
            href={props.path}
            className={
                props.outline
                    ? 'py-1.5 px-2 rounded-md border-2 border-solid w-full block'
                    : 'py-1.5 px-2 rounded-md bg-slate-600 text-white w-full block'
            }
        >
            {props.title}
        </Link>
    );
}
