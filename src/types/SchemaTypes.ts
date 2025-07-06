import {Document} from "mongoose";

export type UserRole = 'admin' | 'donor' | 'recipient';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    bloodType?: string;
    phone: string;
    area: string;
    isAvailable: boolean;
    createdAt: Date;
}
