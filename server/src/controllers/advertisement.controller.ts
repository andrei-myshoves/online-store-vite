import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError.js'

export const createAdvertisement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, price } = req.body

        if (!name || !description || !price) {
            return next(ApiError.badRequest('name, description and price are required'))
        }

        return res.json({ success: true })
    } catch (err) {
        next(err)
    }
}
