import { Request, Response } from 'express'
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
