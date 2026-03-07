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

export const updateCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.user!.userId)

        await user!.update({
            username: req.body.username,
            lastName: req.body.lastName,
            city: req.body.city,
            phone: req.body.phone,
            avatar: req.body.avatar,
        })

        res.json({
            id: user!.id,
            username: user!.username,
            lastName: user!.lastName,
            email: user!.email,
            city: user!.city,
            phone: user!.phone,
            avatar: user!.avatar,
            createdAt: user!.createdAt,
        })
    } catch (e) {
        next(e)
    }
}
