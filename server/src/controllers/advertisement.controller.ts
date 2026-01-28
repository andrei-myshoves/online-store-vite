import { Request, Response } from 'express'
import Advertisement from '../models/Advertisement'
import { ApiError } from '../error/ApiError'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const createAdvertisement = async (req: Request, res: Response) => {
    const { name, description, price } = req.body

    if (!name || !description || !price) {
        throw ApiError.badRequest('name, description and price are required')
    }

    if (!req.user) {
        throw ApiError.unauthorized()
    }

    let images: string[] | undefined = undefined

    const filesMap = req.files as { [key: string]: any } | undefined

    if (filesMap?.images) {
        const files = Array.isArray(filesMap.images) ? filesMap.images : [filesMap.images]

        images = []

        for (const file of files) {
            const fileName = `${uuidv4()}.jpg`
            const filePath = path.resolve(__dirname, '..', 'static', fileName)

            await file.mv(filePath)
            images.push(fileName)
        }
    }

    const advertisement = await Advertisement.create({
        name,
        description,
        price: Number(price),
        images,
        userId: Number(req.user.userId),
    })

    res.status(201).json({
        success: true,
        advertisement,
    })
}
