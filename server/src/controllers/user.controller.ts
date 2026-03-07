import { Request, Response, NextFunction } from 'express'
import User from '../models/User.js'

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.user!.userId, {
            attributes: ['id', 'username', 'email', 'city', 'avatar', 'createdAt'],
        })

        res.json(user)
    } catch (e) {
        next(e)
    }
}
