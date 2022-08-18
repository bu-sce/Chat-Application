import dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.MONGO_USERNAME;
const DB_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.amnqdvu.mongodb.net/chat`;

const SERVER_PORT = process.env.PORT;

 export const config = {
    mongo: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};