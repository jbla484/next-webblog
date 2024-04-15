// Database model for user collection
import mongoose from 'mongoose';

// Create a schema for the user collection
const CommentSchema = new mongoose.Schema({
    articleid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
    },
    author: {
        type: String,
        required: true,
    },
    authorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    avatar: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: new Date(),
    },
    likes: [
        {
            authorid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
    dislikes: [
        {
            authorid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
    replies: [
        {
            commentid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            },
        },
    ],
});

// Create a model out of the schema (will automatically be created)
const CommentModel = mongoose.model('comments', CommentSchema);

// Export to outside of the file
export default CommentModel;
