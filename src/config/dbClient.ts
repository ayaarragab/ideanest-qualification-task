import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ideanest-task';

export async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export async function closeDatabaseConnection(): Promise<void> {
    await mongoose.connection.close();
    console.log('Mongoose connection closed');
}
