import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import UserModel from '../../models/Users.js';

// Generate jwt secret
// console.log(crypto.randomBytes(64).toString('hex'));

// TODO: how will we handle this on the client side?
export const authenticateToken = (req, res, next) => {
    const authenticationHeader = req.headers['authorization'];
    const token = authenticationHeader && authenticationHeader.split(' ')[1];

    // no token, user must login
    if (token == null) return res.send({ error: 'User must login' });

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
        // token is invalid
        if (error) return res.send({ error: 'User login timed out' });

        req.user = user;
        next();
    });
};

const generateAccessToken = (email) => {
    return jwt.sign(email, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '3600s', // 60 minutes
    });
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user already exists and return error if they do
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.send({ error: 'No account exists with that email' });
        }

        // compare encrypted password with plain text password and return error if they don't
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ error: 'Invalid password' });
        }

        const accessToken = generateAccessToken({
            author: user.fullname,
            email,
        });
        return res.json({ token: accessToken });

        // Return a success message to the user
        // return res.send({ msg: 'User successfully logged in' });
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

export const userRegister = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // check if user email already exists
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.send({
                error: 'User account with that email already exists',
            });
        }

        // get gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });

        // create user object
        user = new UserModel({
            fullname,
            email,
            password,
            avatar,
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // insert the user object into the database
        await user.save();

        // Return a success message to the user
        return res.send({ msg: 'User account successfully registered' });
    } catch (error) {
        // Return an error message to the user
        return res.send({ error: error.message });
    }
};
