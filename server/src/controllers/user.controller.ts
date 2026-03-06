import { Request, Response, NextFunction } from 'express'
import User from '../models/User.js'
import { ApiError } from '../error/ApiError.js'

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            throw ApiError.unauthorized()
        }

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'city', 'avatar', 'createdAt'],
        })

        if (!user) {
            throw ApiError.notFound('User not found')
        }

        res.json(user)
    } catch (e) {
        next(e)
    }
}
