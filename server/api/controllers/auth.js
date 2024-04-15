import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import UserModel from '../../models/Users.js';

// Generate jwt secret
// console.log(crypto.randomBytes(64).toString('hex'));

export const authenticateToken = (req, res, next) => {
    // grab the request headers and token
    const authenticationHeader = req.headers['authorization'];
    const token = authenticationHeader && authenticationHeader.split(' ')[1];

    // no token, user must login
    if (token == 'null') return res.send({ error: 'User must login' });

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
        // token is invalid
        if (error) return res.send({ error: 'User login timed out' });

        req.user = user;
        next();
    });
};

export const checkToken = (req, res, next) => {
    // grab the request headers and token
    const authenticationHeader = req.headers['authorization'];
    const token = authenticationHeader && authenticationHeader.split(' ')[1];

    // null token, user is a guest
    if (token === 'null') {
        // console.log('no token, user is a guest');
        return next();
    }

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
        // token is invalid
        if (error) return res.send({ error: 'User login timed out' });

        // console.log(req);

        // req.user = user;
        next();
    });
};

const generateAccessToken = (email) => {
    return jwt.sign(email, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '3600s', // 60 minutes
    });
};

export const userLogin = async (req, res) => {
    // grab the user credentials from the request body
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

        // generate the jwt access token
        const accessToken = generateAccessToken({
            authorid: user._id,
            email,
        });

        // return the jwt and id to the client
        return res.json({
            token: accessToken,
            authorid: user._id,
        });
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
