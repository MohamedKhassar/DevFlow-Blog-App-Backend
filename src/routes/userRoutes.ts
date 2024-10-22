
import { getUser } from "@controllers/UserController";
import { Router } from "express";
import authMiddleware from "middleware/authMiddleware";
export const userAuth = Router()

userAuth.get("/profile", authMiddleware, getUser)