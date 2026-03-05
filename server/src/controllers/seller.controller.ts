import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/error/ApiError.js'
import User from '@/models/User.js'
import Advertisement from '@/models/Advertisement.js'

export const getSellerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = Number(req.params.sellerId)

        const seller = await User.findByPk(sellerId, {
            attributes: ['id', 'username', 'city', 'createdAt', 'avatar'],
        })

        if (!seller) {
            throw ApiError.notFound('Seller not found')
        }

        const advertisementsCount = await Advertisement.count({
            where: { userId: sellerId },
        })

        return res.json({
            id: seller.id,
            username: seller.username,
            city: seller.city,
            registeredAt: seller.createdAt,
            avatar: seller.avatar,
            advertisementsCount,
        })
    } catch (error) {
        next(error)
        return
    }
}

export const getSellerAdvertisements = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = Number(req.params.sellerId)
        const limit = Math.min(Number(req.query.limit ?? 10), 50)
        const offset = Number(req.query.offset ?? 0)

        const seller = await User.findByPk(sellerId)

        if (!seller) {
            throw ApiError.notFound('Seller not found')
        }

        const { rows, count } = await Advertisement.findAndCountAll({
            where: { userId: sellerId },
            attributes: ['id', 'name', 'price', 'images', 'createdAt'],
            order: [
                ['createdAt', 'DESC'],
                ['id', 'DESC'],
            ],
            limit,
            offset,
        })

        const items = rows.map(ad => ({
            id: ad.id,
            name: ad.name,
            price: ad.price,
            city: ad.city,
            createdAt: ad.createdAt,
            images: ad.images ?? [],
        }))

        return res.json({
            items,
            total: count,
        })
    } catch (error) {
        next(error)
        return
    }
}
