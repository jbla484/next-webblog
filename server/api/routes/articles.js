import express from 'express';
const router = express.Router();

import {
    createArticle,
    updateArticle,
    deleteArticle,
    getFeatured,
    getLatest,
    getTrending,
    getArticle,
    getCategories,
    addComment,
    favoriteArticle,
    getArticlesByAuthor,
} from '../controllers/articles.js';
import { authenticateToken, checkToken } from '../controllers/auth.js';

router.post('/create', authenticateToken, createArticle);
router.post('/update', authenticateToken, updateArticle); // TODO:
router.post('/delete', authenticateToken, deleteArticle); // TODO:

router.get('/featured', getFeatured);
router.get('/latest', getLatest);
router.get('/trending', getTrending);

// /articles/comments/add
router.post('/comments/add', checkToken, addComment);

// /articles/favorite
router.post('/favorite', authenticateToken, favoriteArticle);

// /articles/categories/:category
router.get('/categories/:category', getCategories);

// /articles/:articleid
router.get('/:id', getArticle);

// /articles/author/:authorid
router.get('/author/:authorid', getArticlesByAuthor);

export default router;
