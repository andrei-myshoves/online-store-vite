import { Request, Response } from 'express'
import { ApiError } from '@/error/ApiError.js'
import Review from '@/models/Review.js'
import Advertisement from '@/models/Advertisement.js'

export const createReview = async (req: Request, res: Response) => {
    if (!req.user) {
        throw ApiError.unauthorized()
    }

    const { advertisementId, rating, text } = req.body

    const advertisement = await Advertisement.findByPk(advertisementId)

    if (!advertisement) {
        throw ApiError.notFound('Advertisement not found')
    }

    if (advertisement.userId === req.user.userId) {
        throw ApiError.badRequest('You cannot review your own advertisement')
    }

    try {
        const review = await Review.create({
            advertisementId,
            rating,
            text,
            userId: req.user.userId,
        })

        await advertisement.increment('reviewsCount')

        return res.status(200).json(review)
    } catch (error) {
        throw ApiError.badRequest('You already reviewed this advertisement')
    }
}
