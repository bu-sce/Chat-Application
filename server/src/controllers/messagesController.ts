import { NextFunction, Request, Response } from 'express';

import Messages from '../models/messageModel';

const addMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { from, to, message} = req.body;
        const data = await Messages.create({
            message: { text: message},
            users: [from, to],
            sender: from,
        });
        if (data) {
            await data.save();
            return res.json({ msg: "Message added successfully." });
        }
        return res.json({ msg: "Failed to add message to DB." });
    } catch (ex) {
        next(ex);
    }
};

const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1});
        const projectMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        res.json(projectMessages);

    } catch (ex) {
        next(ex);
    }

};


export default { addMessage, getAllMessages }; 
