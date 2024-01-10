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
} from '../controllers/articles.js';
import { authenticateToken } from '../controllers/auth.js';

router.post('/create', authenticateToken, createArticle);
router.post('/update', authenticateToken, updateArticle); // TODO:
router.post('/delete', authenticateToken, deleteArticle); // TODO:

router.get('/featured', getFeatured);
router.get('/latest', getLatest);
router.get('/trending', getTrending);

router.get('/categories/:category', getCategories);

router.get('/:id', getArticle);

export default router;
