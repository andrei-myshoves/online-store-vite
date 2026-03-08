import { Request, Response, NextFunction } from 'express'
import User from '../models/User.js'
import Advertisement from '@/models/Advertisement.js'

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.user!.userId, {
            attributes: ['id', 'username', 'email', 'city', 'avatar', 'createdAt'],
        })

        res.json(user)
    } catch (e) {
        next(e)
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
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

export const getProfileAdvertisements = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = Number(req.params.id)

        const limit = Number(req.query.limit) || 10
        const offset = Number(req.query.offset) || 0

        const { rows, count } = await Advertisement.findAndCountAll({
            where: { userId: profileId },
            limit,
            offset,
            order: [
                ['createdAt', 'DESC'],
                ['id', 'DESC'],
            ],
        })

        const items = rows.map(ad => ({
            id: ad.id,
            name: ad.name,
            price: ad.price,
            city: ad.city,
            createdAt: ad.createdAt,
            image: ad.images?.[0] ?? null,
        }))

        res.json({
            items,
            total: count,
        })
    } catch (e) {
        next(e)
        return
    }
}
