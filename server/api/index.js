import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles.js';

import { userLogin, userRegister } from './controllers/auth.js';
import { connectToDatabase } from './database.js';
import { authenticateToken } from './controllers/auth.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/articles', articlesRouter);

// TODO: query database to get featured content
app.get('/', (req, res) => {
    console.log('[server]: get featured content');
    return res.send({ msg: 'Got featured content' });
});

app.post('/login', userLogin);
app.post('/register', userRegister);

app.post('/verify', authenticateToken, (req, res) => {
    res.send({ msg: 'User verified' });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

connectToDatabase();
