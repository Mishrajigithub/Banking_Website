import mongoose from "mongoose";
import dotenv from 'dotenv';
import UserModel from "../model/userSchema.js";
import { users } from "./sampleDta.js";

const url ="mongodb+srv://akashkumarsmt343:fzxiRAFEHp4wvqjS@cluster0.mpk99.mongodb.net/bankdb"


dotenv.config();

// const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected using MongoDB Atlas");
        
    } catch (error) {
        console.error("Not connected:", error);
        process.exit(1); 
    }
};
