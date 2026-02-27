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
            name: seller.username,
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
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        })

        const items = rows.map(ad => ({
            id: ad.id,
            title: ad.name,
            price: ad.price,
            city: seller.city,
            createdAt: ad.createdAt,
            image: ad.images?.[0] ?? null,
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
