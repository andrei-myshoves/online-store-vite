import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/error/ApiError.js'
import User from '@/models/User.js'
import Advertisement from '@/models/Advertisement.js'

export const getSellerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = Number(req.params.sellerId)

        if (isNaN(sellerId)) {
            throw ApiError.badRequest('Invalid seller id')
        }

        const seller = await User.findByPk(sellerId, {
            attributes: ['id', 'username', 'city', 'createdAt', 'avatar'],
        })

        if (!seller) {
            throw ApiError.notFound('Seller not found')
        }

        const advertisementsCount = await Advertisement.count({
            where: { userId: sellerId },
        })

        return res.status(200).json({
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
