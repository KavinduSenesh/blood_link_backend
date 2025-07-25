import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface AuthRequest extends Request{
    user?: any; // Adding user to the Request object
}

export const protector = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Check if token exists in the Authorization header
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Extract token
            token = req.headers.authorization.split('')[1];

            // Verify token
            const decoded: any  = jwt.sign(token, process.env.JWT_SECRET as string);

            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move to next middleware/controller
        }catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    }else{
        res.status(401).json({ message: "No token provided" });
    }
}
