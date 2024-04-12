// Database model for user collection
import mongoose from 'mongoose';

// Create a schema for the user collection
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'User',
    },
    description: {
        type: String,
        default: 'Self made blogger.',
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    created: {
        type: Date,
        default: new Date(),
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
        },
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
        },
    ],
});

// Create a model out of the schema (will automatically be created)
const UserModel = mongoose.model('users', UserSchema);

// Export to outside of the file
export default UserModel;
