import mongoose from 'mongoose';

// connect to the mongodb database
export const connectToDatabase = async () => {
    try {
        // Grab the MongoDB URI from the local environment variables file and connect with it
        await mongoose.connect(process.env.DB_ENDPOINT);
        console.log('Established a connection to the MongoDB database');
    } catch (error) {
        console.error(`Failed to connect to MongoDB database: ${error}`);
    }
};
