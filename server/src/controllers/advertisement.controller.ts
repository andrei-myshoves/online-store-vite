import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError.js'
import Advertisement from '@/models/Advertisement.js'
import { TypedQueryRequest } from '@/middleware/withTypedQuery.js'
import User from '@/models/User'
import { GetAdvertisementsQuery } from '@/schemas/advertisement.schema.js'
import slugify from 'slugify'
import { validateImages } from '@/utils/validateImages'

export const createAdvertisement = async (req: Request, res: Response) => {
    if (!req.user) {
        throw ApiError.unauthorized()
    }

    const { name, description, price, city } = req.body

    const files = (req.files as Express.Multer.File[]) || []

    validateImages({
        files,
        minCount: 0,
    })

    const imageUrls = files.map(file => `/static/advertisements/${file.filename}`)

    const slug = slugify(name, { lower: true, strict: true })

    const advertisement = await Advertisement.create({
        name,
        description,
        price,
        city,
        slug,
        userId: req.user.userId,
        images: imageUrls,
    })

    res.status(201).json(advertisement)
}

export const getAdvertisements = async (
    req: TypedQueryRequest<GetAdvertisementsQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, offset, userId } = req.query

        let where = undefined

        if (userId) {
            const user = await User.findByPk(userId)

            if (user) {
                where = { userId }
            }
        }

        const { rows: items, count: total } = await Advertisement.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        })

        res.status(200).json({
            items,
            total,
            limit,
            offset,
        })
    } catch (err) {
        next(err)
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

        const advertisement = await Advertisement.findByPk(id)

        if (!advertisement) {
            throw ApiError.notFound('Advertisement not found')
        }

        res.status(200).json(advertisement)
    } catch (error) {
        next(error)
    }
}
