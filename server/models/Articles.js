// Database model for user collection
import mongoose from 'mongoose';

// Create a schema for the user collection
const ArticleSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    authorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    image: {
        // type: Buffer,
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: new Date(),
    },
    comments: [
        {
            author: {
                type: String,
                // required: true,
            },
            authorid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            description: {
                type: String,
                required: true,
            },
            created: {
                type: Date,
                default: new Date(),
            },
        },
    ],
});

// Create a model out of the schema (will automatically be created)
const ArticleModel = mongoose.model('articles', ArticleSchema);

// Export to outside of the file
export default ArticleModel;
