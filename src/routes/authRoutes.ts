import { deleteUser, login, register } from "@controllers/authController";
import { Request, Response, Router } from "express";
import authMiddleware from "middleware/authMiddleware";
import { authMidReq } from "types";
export const authRoutes = Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.delete("/delete", deleteUser)
