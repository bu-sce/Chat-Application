import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

export default function ErrorHandler (req: Request, res: Response, next: NextFunction) {
    const error = new Error('Not found');

    Logging.error(error);

    res.status(404).json({
        message: error.message
    });
    next();
}