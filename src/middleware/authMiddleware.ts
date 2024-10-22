import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { authMidReq, DecodedToken } from "types";
const SECRET_KEY = process.env.SECRET_KEY!

const authMiddleware = (req: authMidReq, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers

    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded as DecodedToken;
        next();
    });
}

export default authMiddleware;