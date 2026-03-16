import { Request, Response, NextFunction } from 'express'
import User from '../models/User.js'

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = Number(req.user!.userId)

        const user = await User.findByPk(id, {
            attributes: ['id', 'username', 'lastName', 'email', 'city', 'phone', 'avatar', 'createdAt'],
        })

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        res.json(user)
    } catch (e) {
        next(e)
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = Number(req.user!.userId)

        const user = await User.findByPk(id)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        await user.update({
            username: req.body.username,
            lastName: req.body.lastName,
            city: req.body.city,
            phone: req.body.phone,
            avatar: req.body.avatar,
        })

        res.json({
            id: user.id,
            username: user.username,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.createdAt,
        })
    } catch (e) {
        next(e)
    }
}
