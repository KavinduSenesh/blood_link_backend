import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string) => {
    // @ts-ignore
    return jwt.sign({userId}, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN as string,
    });
};
