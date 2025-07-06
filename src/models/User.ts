import mongoose, {Schema} from "mongoose";
import {IUser, UserRole} from "../types/SchemaTypes";

const UserScheme = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'doner', 'recipient'], default: 'recipient' },
    bloodType: { type: String },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model<IUser>("User", UserScheme);

export default User;



