import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(
            process.env.DB_CONNECTION 
            || 'mongodb://localhost/db'
        );
        console.log('DB connection successful');
    } catch (error) {
        console.log(error);
        throw new Error('DB connection failed, check logs');
    }
};