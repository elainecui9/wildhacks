import { Request, Response, NextFunction } from 'express'

export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies['auth-token']
        if (!token) return res.status(400).json('You are not signed in')
        res.clearCookie('auth-token', {
            secure: true,
            sameSite: 'strict',
            httpOnly: true,
        }).status(200).json('You have successfully logged out')
    } catch (error) {
        res.status(400).json(error)
    }
}

