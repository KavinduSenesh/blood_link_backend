import {Request, Response} from "express";
import User from "../models/User";
import { error } from "console";
import {generateAccessToken} from "../utils/generateToken";

export const signUpUser = async (req: Request, res: Response)=> {
    const { name, email, password, role, bloodType, phone, area, isAvailable, createdAt } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists){
            return res.status(409).json({ message: "User already exists with this email. Use another email." });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            bloodType,
            phone,
            area,
            isAvailable,
            createdAt
        });

        if(user) {
            const accessToken = generateAccessToken(user._id as string);

            await user.save();

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken,
            })
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }catch (e){
        error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}
