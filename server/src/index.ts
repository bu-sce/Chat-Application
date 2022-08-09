import express, { Request, Response ,NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config/config';
import Logging from './library/Logging';
import Logger from './middleware/Logger';
import API_Rules from './middleware/apiRules';
import ErrorHandler from './middleware/errorHandler';
// const corsOptions = require('./config/coreOption')
import userRoutes from './routes/userRoute';
import { number } from 'joi';

const app = express();

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
    .catch((error : any) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    app.use(Logger);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules of our API */
    //app.use(cors(corsOptions));
     app.use(API_Rules);

    


    /** Routes */
    app.use("/api/auth", userRoutes);


    /** Healthcheck */
   

    /** Error handling */
    app.use(ErrorHandler);

    app.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
