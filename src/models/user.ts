import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    course: string;
    email: string;
    tell: number;
    date: Date;
    country: string;
    city: string;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    course: { type: [String], required: true },
    email: {
        type: String, required: true, unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    tell: { type: String, required: true },
    date: { type: Date, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
