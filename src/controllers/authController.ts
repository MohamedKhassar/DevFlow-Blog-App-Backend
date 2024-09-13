import pool from "db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
const SECRET_KEY = process.env.SECRET_KEY!

const createToken = (id: string) => {
    const token = jwt.sign({ id }, SECRET_KEY, {
        expiresIn: "1h"
    })
    return token
}

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await (await pool.query("select * from users where email=$1", [email])).rows[0]
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = (await pool.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)  RETURNING id,name,email", [name, email, hashedPassword])).rows[0]
            const token = createToken(user)
            res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000 * 2,
            }).json({
                message: "User registered successfully",
                user,
                token
            })
        }

    } catch (error) {

    }
}

const login = (req: Request, res: Response) => {
    res.json("hi")
}

export {
    register,
    login,
}