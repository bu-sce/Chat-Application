import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    username: string;
}

export interface IMessageModel extends IMessage, Document {
    username: string,
    email: string,
    password: string,
    isAvatarImageSet: boolean,
    avatarImage: string,
}

const MessageSchema: Schema = new Schema(
    {
        message: {
            text: { type: String, required: true },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Messages', MessageSchema);

