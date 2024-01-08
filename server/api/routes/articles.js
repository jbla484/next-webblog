import express from 'express';
const router = express.Router();

import {
    createArticle,
    updateArticle,
    deleteArticle,
} from '../controllers/articles.js';
import { authenticateToken } from '../controllers/auth.js';

router.post('/create', authenticateToken, createArticle);
router.post('/update', authenticateToken, updateArticle); // TODO:
router.post('/delete', authenticateToken, deleteArticle); // TODO:

export default router;
