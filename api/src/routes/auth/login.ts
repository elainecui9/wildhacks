import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { User, UserToken } from '../../models/User'
dotenv.config()


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) { return res.status(400).json('No user registered under this email: meant to register?')}
        const validPassword = bcrypt.compareSync(password, existingUser!.password)
        if (!validPassword) { return res.status(400).json('Invalid password')}
        const payload: UserToken = {
            _id: existingUser!._id,
        }
        const token = jwt.sign(payload, process.env.PRIVATEKEY as string)
        if (req.cookies['auth-token']) {
            res.clearCookie('auth-token')
        }
        res.cookie('auth-token', token, {
            //lasts 2 weeks
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000 * 2),
            secure: true,
            sameSite: 'strict',
            httpOnly: true,
        }).status(200).json('You have successfully logged in.')
    } catch (error) {
        res.status(400).json(error)
    }
}

