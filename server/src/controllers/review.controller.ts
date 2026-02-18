import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/error/ApiError.js'
import Review from '@/models/Review.js'
import Advertisement from '@/models/Advertisement.js'
import User from '@/models/User.js'
import type { Order } from 'sequelize'

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { advertisementId, rating, text } = req.body

        const advertisement = await Advertisement.findByPk(advertisementId)

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        if (advertisement.userId === req.user!.userId) {
            throw ApiError.badRequest('Cannot review your own advertisement')
        }

        const existingReview = await Review.findOne({
            where: {
                userId: req.user!.userId,
                advertisementId,
            },
        })

        if (existingReview) {
            throw ApiError.badRequest('You already reviewed this advertisement')
        }

        const review = await Review.create({
            advertisementId,
            rating,
            text,
            userId: req.user!.userId,
        })

        await advertisement.increment('reviewsCount')

        return res.status(200).json(review)
    } catch (error) {
        next(error)
        return
    }
}

export const getReviewsBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params

        const { page = 1, limit = 10 } = req.query as any

        const advertisement = await Advertisement.findOne({
            where: { slug },
        })

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        const offset = (Number(page) - 1) * Number(limit)

        const order: Order = [['createdAt', 'DESC']]

        const { rows, count } = await Review.findAndCountAll({
            where: {
                advertisementId: advertisement.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'avatar'],
                },
            ],
            limit: Number(limit),
            offset,
            order,
        })

        return res.status(200).json({
            items: rows,
            total: count,
            page: Number(page),
            limit: Number(limit),
        })
    } catch (error) {
        next(error)
        return
    }
}
