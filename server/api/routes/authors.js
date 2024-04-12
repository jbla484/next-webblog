import express from 'express';
import { getAuthor } from '../controllers/authors.js';

const router = express.Router();
router.get('/:id', getAuthor);

export default router;
