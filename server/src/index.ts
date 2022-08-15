import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Socket } from 'socket.io';
const socket = require('socket.io');
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');


/** Internal Imports */
import Logging from './library/Logging';
import Logger from './middleware/Logger';
import API_Rules from './middleware/apiRules';
import ErrorHandler from './middleware/errorHandler';
import keys from './config/keys';
import { config } from './config/config';


/** Routes */
import userRoutes from './routes/userRoute';
import messageRoute from './routes/messagesRoute';


const app: Application = express();


/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, {
        retryWrites: true,
        w: 'majority',
    })
    .then(() => {
        Logging.info('MongoDB connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    app.use(Logger);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    /** Rules of our API */
    app.use(cors())
    app.use(API_Rules);
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]  //key to encypt the cookies
    }))

    /** Routes */
    app.use('/api/auth', userRoutes);
    app.use('/api/messages', messageRoute);


    /** Error handling */
    app.use(ErrorHandler);

    const server = app.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

    /** Socket connection */
    const io = socket(server, {
        cors: {
            origin: '*',
            Credentials: true,
        },
    });

    global.onlineUsers = new Map();

    io.on("connection", (socket: Socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId: any) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data: any) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            }
        });
    });
};
