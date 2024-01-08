// Database model for user collection
import mongoose from 'mongoose';

// Create a schema for the user collection
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
        },
    ],
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
});

// Create a model out of the schema (will automatically be created)
const UserModel = mongoose.model('users', UserSchema);

// Export to outside of the file
export default UserModel;
