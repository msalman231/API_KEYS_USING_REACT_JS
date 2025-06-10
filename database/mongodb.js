import mongoose from "mongoose";

import { DB_URI, NODE_ENV} from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env<devlopment/production>.local");
}

const connectToDB = async () => {
    const DB_URI = process.env.DB_URI; // Ensure this is defined from .env

    if (!DB_URI) {
        console.error('❌ DB_URI is not defined in environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex and useFindAndModify are no longer needed in Mongoose 6+
        });

        console.log(`✅ MongoDB Connected successfully in ${process.env.NODE_ENV} mode`);
    } catch (error) {
        console.error('❌ Error connecting to database:', error.message);
        process.exit(1);
    }
};

export default connectToDB;