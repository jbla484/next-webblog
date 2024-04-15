'use client';

import Input from '@/components/input';
import { categoryIcon } from '@/utils/utils';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { IoHardwareChipOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';

import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';

import { PiThumbsUpLight } from 'react-icons/pi';
import { PiThumbsUpFill } from 'react-icons/pi';
import { PiThumbsDownLight } from 'react-icons/pi';
import { PiThumbsDownFill } from 'react-icons/pi';

import { GoSquareFill } from 'react-icons/go';

import { UserContext } from '@/components/UserContext';

import { v4 as uuidv4 } from 'uuid';

// Unable to figure out if user has favorited article on load due to the favorite being on the user object, not the article.
// we can query the backend to check

interface Params {
    articleid: string;
}

interface Comment {
    _id: string;
    author: string;
    avatar: string;
    authorid: string;
    description: string;
    created: Date;
    likes: Likes[];
    dislikes: Likes[];
}

interface Likes {
    // author: string;
    authorid: string;
}

interface Article {
    image: string;
    title: string;
    author: string;
    created: Date;
    description: string;
    likes: Likes[];
    comments: Comment[];
    category: string;
}

interface Articles {
    articleid: string;
}

interface Favorites {
    articleid: string;
}

interface Author {
    _id: string;
    articles: Articles[];
    avatar: string;
    created: Date;
    email: string;
    favorites: Favorites[];
    fullname: string;
}

// TODO: why are we getting an error here>?
export default function Article({ params }: { params: Params }) {
    const { articleid } = params;

    const [favorited, setFavorited] = useState<boolean>(false);

    const [gotUser, setGotUser] = useState<boolean>(false);

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

    const [comments, setComments] = useState<Array<Comment>>([
        {
            _id: '',
            author: '',
            avatar: '',
            authorid: '',
            description: '',
            created: new Date(),
            likes: [],
            dislikes: [],
        },
    ]);

    const [author, setAuthor] = useState<Author>({
        _id: '',
        articles: [],
        avatar: '',
        created: new Date(),
        email: '',
        favorites: [],
        fullname: '',
    });

    const [comment, setComment] = useState<string>('');
    const [reply, setReply] = useState<string>('');
    const [replyInput, setReplyInput] = useState<string>('');

    function showReply() {}

    // TODO: get users gravatar
    async function addComment() {
        const query = await fetch(
            'http://192.168.1.28:3001/articles/comments/add',
            {
                method: 'POST',
                body: JSON.stringify({
                    articleid,
                    description: comment,
                    authorid: author._id,
                    author: author.fullname,
                }),
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const response = await query.json();

        // TODO: doesnt update total comment count
        setComment('');
        setComments(response);
    }

    async function likeComment(commentid: string) {
        const query = await fetch(
            'http://192.168.1.28:3001/articles/comments/like',
            {
                method: 'POST',
                body: JSON.stringify({
                    authorid: author._id,
                    commentid,
                }),
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const response = await query.json();

        let newComments = comments.map((comment) => {
            if (comment._id === response._id) return response;
            else return comment;
        });
        setComments(newComments);
    }

    async function dislikeComment(commentid: string) {
        const query = await fetch(
            'http://192.168.1.28:3001/articles/comments/dislike',
            {
                method: 'POST',
                body: JSON.stringify({
                    authorid: author._id,
                    commentid,
                }),
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const response = await query.json();

        let newComments = comments.map((comment) => {
            if (comment._id === response._id) return response;
            else return comment;
        });
        setComments(newComments);
    }

    async function favoriteArticle() {
        console.log(`favorited article with id ${articleid}`);
        const query = await fetch(
            'http://192.168.1.28:3001/articles/favorite',
            {
                method: 'POST',
                body: JSON.stringify({
                    articleid,
                }),
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const response = await query.json();
        console.log(response);
        if (!response.error) {
            setFavorited(true);
        } else {
            //setError(response.error);
        }
    }

    async function unfavoriteArticle() {
        // TODO: needs backend functionality
        console.log('unfavorite article with id ' + articleid);

        const query = await fetch(
            'http://192.168.1.28:3001/articles/unfavorite',
            {
                method: 'POST',
                body: JSON.stringify({
                    articleid,
                }),
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const response = await query.json();
        // console.log(response);
        if (!response.error) {
            setFavorited(false);
        } else {
            // setError(response.error);
        }
    }

    // get article info
    useEffect(() => {
        const getArticle = async () => {
            try {
                const query = await fetch(
                    `http://192.168.1.28:3001/articles/${articleid}`
                );
                const response = await query.json();

                setArticle(response[0]);
            } catch (error) {
                console.error(error);
            }
        };
        getArticle();

        const getUserInfo = async () => {
            try {
                const query = await fetch(
                    `http://192.168.1.28:3001/authors/${sessionStorage.getItem(
                        'authorid'
                    )}`
                );

                const response = await query.json();
                if (!response.error) {
                    setGotUser(true);
                    setAuthor(response[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUserInfo();

        const getComments = async () => {
            try {
                const query = await fetch(
                    `http://192.168.1.28:3001/articles/${articleid}/comments`
                );

                const response = await query.json();
                setComments(response);
            } catch (error) {
                console.error(error);
            }
        };
        getComments();
    }, [articleid]);

    // render article info
    return (
        <>
            <div className='mt-16 flex'>
                <div className='flex flex-grow text-sm'>
                    <Link href='/'>Home</Link>
                    <p className='mx-2'>&#x2192;</p>
                    <Link href='/articles/categories'>Categories</Link>
                    <p className='mx-2'>&#x2192;</p>
                    <Link
                        href='/articles/categories/tech'
                        className='text-green-600'
                    >
                        {article.category.charAt(0).toUpperCase() +
                            article.category.slice(1)}
                    </Link>
                </div>

                {/* TODO: allow user to favorite article, show appropriate icon */}
            </div>
            <div className='flex flex-col justify-center text-left mt-4'>
                <img
                    src={article.image}
                    width={1000}
                    height={1000}
                    alt='blog post'
                    className='rounded-md mt-2'
                />

                <div className='flex flex-row text-gray-700 my-4'>
                    <IoPersonOutline
                        size={22}
                        className='mr-1'
                    />
                    <p className=' text-sm'>{article.author}</p>

                    <IoCalendarOutline
                        size={22}
                        className='mr-2 ml-4'
                    />
                    <p className='text-sm flex-grow'>
                        {new Date(article.created).toLocaleDateString()}
                    </p>

                    <div className='flex text-green-500'>
                        {favorited ? (
                            <MdFavorite
                                size={22}
                                onClick={unfavoriteArticle}
                            />
                        ) : (
                            <MdFavoriteBorder
                                size={22}
                                onClick={favoriteArticle}
                            />
                        )}
                    </div>
                </div>
                <hr className='mb-4'></hr>

                <h1 className='text-3xl'>
                    <b>{article.title}</b>
                </h1>
                <p className='text-xl mt-2'>{article.description}</p>

                <div className='flex items-center mt-4 mb-2'>
                    <h1 className='text-2xl font-bold'>Conversation</h1>
                    <p className='pl-2'>
                        {/* article.comments.length */}
                        {comments.length}{' '}
                        {comments.length > 1 || comments.length == 0
                            ? 'Comments'
                            : 'Comment'}
                    </p>
                </div>
                <hr></hr>

                <div className='mt-2 text-sm flex'>
                    <p className='flex-grow'>
                        Commenting as{' '}
                        <b>{gotUser ? author.fullname : 'Guest'}</b>
                    </p>
                    {gotUser ? (
                        <></>
                    ) : (
                        <div className='flex gap-1'>
                            <Link href='/login'>Log In</Link>
                            <div className='text-gray-300'>|</div>
                            <Link href='/register'>Sign Up</Link>
                        </div>
                    )}
                </div>

                <div className='flex'>
                    <img
                        src={
                            gotUser
                                ? author.avatar
                                : '//www.gravatar.com/avatar/1a7a0374cbdeb7c365ef0737c028d8d8?s=200&r=pg&d=mm'
                        }
                        width={40}
                        height={40}
                        alt='gravatar image'
                        className='my-2 rounded-full mr-2'
                    />
                    <input
                        type='text'
                        placeholder='What do you think?'
                        className='border-solid border-2 bg-transparent rounded-md p-2 my-2 block w-full'
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                        value={comment}
                    ></input>
                </div>

                {comment && (
                    <div className='align text-right'>
                        <button
                            className='bg-green-600 text-white px-4 py-1 rounded-md'
                            onClick={addComment}
                        >
                            Post
                        </button>
                    </div>
                )}

                <div className='mb-2'>
                    <p>
                        Sort by{' '}
                        <b>
                            <select>
                                <option value='best'>Best</option>
                                <option value='newest'>Newest</option>
                                <option value='oldest'>Oldest</option>
                            </select>
                        </b>
                    </p>
                </div>

                {/* TODO: reply to profiles comment */}
                <div>
                    {comments.map((comment: Comment, i: number) => {
                        return (
                            <div key={uuidv4()}>
                                <div
                                    key={i}
                                    className='flex'
                                >
                                    <div className='inline-block flex h-12'>
                                        <img
                                            src={comment.avatar}
                                            width={30}
                                            height={30}
                                            alt='gravatar image'
                                            className='my-2 rounded-full mr-2'
                                        />
                                    </div>
                                    <div className='block w-full'>
                                        <div>
                                            <b>{comment.author}</b>
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                            {new Date(
                                                comment.created
                                            ).toLocaleDateString()}
                                        </div>
                                        <div>{comment.description}</div>

                                        <div className='flex items-center'>
                                            <button
                                                type='button'
                                                className='text-sm text-gray-500'
                                                onClick={(e) => {
                                                    if (
                                                        replyInput ==
                                                        comment._id
                                                    )
                                                        setReplyInput('');
                                                    else
                                                        setReplyInput(
                                                            comment._id
                                                        );
                                                }}
                                            >
                                                Reply
                                            </button>

                                            <GoSquareFill
                                                size={8}
                                                className='cursor-pointer text-gray-300 mx-2'
                                            />

                                            {comment.likes.find(
                                                (comment) =>
                                                    comment.authorid ===
                                                    author._id
                                            ) ? (
                                                <PiThumbsUpFill
                                                    size={19}
                                                    className='cursor-pointer text-gray-500'
                                                    onClick={(e) =>
                                                        likeComment(comment._id)
                                                    }
                                                />
                                            ) : (
                                                <PiThumbsUpLight
                                                    size={19}
                                                    className='cursor-pointer text-gray-500'
                                                    onClick={(e) =>
                                                        likeComment(comment._id)
                                                    }
                                                />
                                            )}
                                            {comment.likes.length > 0 && (
                                                <div className='cursor-pointer text-gray-500 ml-1'>
                                                    {comment.likes.length}
                                                </div>
                                            )}

                                            {comment.dislikes.find(
                                                (comment) =>
                                                    comment.authorid ===
                                                    author._id
                                            ) ? (
                                                <PiThumbsDownFill
                                                    size={19}
                                                    className='cursor-pointer text-gray-500 ml-2'
                                                    onClick={(e) =>
                                                        dislikeComment(
                                                            comment._id
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <PiThumbsDownLight
                                                    size={19}
                                                    className='cursor-pointer text-gray-500 ml-2'
                                                    onClick={(e) =>
                                                        dislikeComment(
                                                            comment._id
                                                        )
                                                    }
                                                />
                                            )}
                                            {comment.dislikes.length > 0 && (
                                                <div className='cursor-pointer text-gray-500 ml-1'>
                                                    {comment.dislikes.length}
                                                </div>
                                            )}
                                        </div>

                                        {replyInput === comment._id && (
                                            <input
                                                type='text'
                                                placeholder={`Reply to ${comment.author}`}
                                                className='border-solid border-2 bg-transparent rounded-md p-2 my-2 block w-full'
                                                onChange={(e) => {
                                                    setReply(e.target.value);
                                                }}
                                                value={reply}
                                            ></input>
                                        )}

                                        {/* TODO: only one character and then a bug? */}
                                        {replyInput === comment._id &&
                                            reply && (
                                                <div className='align text-right'>
                                                    <button
                                                        className='bg-green-600 text-white px-4 py-1 rounded-md'
                                                        onClick={addComment}
                                                    >
                                                        Post
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <hr className='my-2'></hr>
                            </div>
                        );
                    })}
                </div>

                {/* <p className='text-xl mt-1'>Likes: {article.likes}</p> */}
                {/* <p className='text-xl mt-1'>Comments: {article.comments}</p> */}
            </div>
        </>
    );
}
