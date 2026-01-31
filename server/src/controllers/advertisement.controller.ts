import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError.js'
import Advertisement from '@/models/Advertisement.js'

export const createAdvertisement = async (req: Request, res: Response) => {
    const { name, description, price } = req.body

    if (!name || !description || !price) {
        throw ApiError.badRequest('name, description and price are required')
    }

    if (!req.user) {
        throw ApiError.unauthorized()
    }

    const advertisement = await Advertisement.create({
        name,
        description,
        price: Number(price),
        userId: 1,
    })

    res.status(201).json(advertisement)
}

export const getAdvertisements = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = Number(req.query.limit) || 10
        const offset = Number(req.query.offset) || 0

        const { count, rows } = await Advertisement.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'name', 'price', 'images', 'userId'],
        })

        return res.json({
            count,
            limit,
            offset,
            items: rows.map(ad => ({
                id: ad.id,
                title: ad.name,
                price: ad.price,
                images: ad.images || [],
                userId: ad.userId,
            })),
        })
    } catch (err) {
        next(err)
        return
    }
}
