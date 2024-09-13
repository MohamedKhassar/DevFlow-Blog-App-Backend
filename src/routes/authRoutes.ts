import { login, register } from "@controllers/authController";
import { Router } from "express";

export const authRoutes = Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login)
