import { Request, Response, NextFunction } from 'express'
import Advertisement from '../models/Advertisement'
import { ApiError } from '../error/ApiError'

export const checkAdvertisementOwner = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized()
        }

        const advertisement = await Advertisement.findByPk(req.params.id)

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        if (String(advertisement.userId) !== String(req.user.userId)) {
            throw ApiError.forbidden('You are not the owner of this advertisement')
        }

        next()
    } catch (error) {
        next(error)
    }
}
