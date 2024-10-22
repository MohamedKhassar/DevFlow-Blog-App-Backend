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
    const date = new Date().toUTCString()
    console.log(date)
    try {
        const userExist = await (await pool.query("select * from users where email=$1", [email])).rows[0]
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = (await pool.query("INSERT INTO users(name,email,password,created_at) VALUES($1,$2,$3,$4)  RETURNING id,name,email,created_at", [name, email, hashedPassword, date])).rows[0]
            const token = createToken(user.id)
            res.json({
                message: "User registered successfully",
                token,
            })
        }

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const userExist = await (await pool.query("select * from users where email=$1", [email])).rows[0]
        if (userExist) {
            const matchedPassword = await bcrypt.compare(password, userExist.password)
            if (matchedPassword) {
                const token = createToken(userExist.id)
                return res.cookie("access_token", token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 1000 * 2,
                }).json({
                    message: "User logged in successfully",
                    token
                })
            }
        }
        return res.status(400).json({ message: "User does not exist" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    await pool.query("delete from users")
    res.json("delete user")
}

export {
    register,
    login,
    deleteUser,
}