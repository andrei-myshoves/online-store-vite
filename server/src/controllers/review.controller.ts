import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/error/ApiError.js'
import Review from '@/models/Review.js'
import Advertisement from '@/models/Advertisement.js'

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
