import pool from "db";
import { Request, Response } from "express";
import { authMidReq } from "types";

const getUser = async (req: authMidReq, res: Response) => {
    try {
        const id = req.user?.id
        const user = await (await pool.query("select id,name,email,created_at from users where id=$1", [id])).rows[0]
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export {
    getUser,
}