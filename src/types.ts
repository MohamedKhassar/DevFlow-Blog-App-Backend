import { Request } from "express";

// src/types.ts
export interface DecodedToken {
    id: string;  // Adjust according to your JWT payload structure
    iat: number;
    exp: number;
}

export interface authMidReq extends Request {
    user?: DecodedToken
}