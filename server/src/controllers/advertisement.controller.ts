import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError.js'
import Advertisement from '@/models/Advertisement.js'

export const createAdvertisement = async (req: Request, res: Response) => {
    if (!req.user) {
        throw ApiError.unauthorized()
    }

    const { name, description, price } = req.body

    const advertisement = await Advertisement.create({
        name,
        description,
        price,
        userId: req.user.userId,
    })

    res.status(201).json(advertisement)
}

export const getAdvertisements = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, offset } = req.query as unknown as {
            limit: number
            offset: number
        }

        const items = await Advertisement.findAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        })

        const total = await Advertisement.count()

        res.status(200).json({
            items,
            total,
            limit,
            offset,
        })
    } catch (err) {
        next(err)
        return
    }
}

export const updateAdvertisement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const advertisement = await Advertisement.findByPk(req.params.id)

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        await advertisement.update(req.body)

        res.status(200).json({
            success: true,
            advertisement,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteAdvertisement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)

        const advertisement = await Advertisement.findByPk(id)

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        await advertisement.destroy()

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const getAdvertisementById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if (!id || typeof id !== 'string') {
            throw ApiError.badRequest('Invalid advertisement id')
        }

        const advertisement = await Advertisement.findByPk(id)

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        return res.status(200).json(advertisement)
    } catch (error) {
        next(error)
        return
    }
}
