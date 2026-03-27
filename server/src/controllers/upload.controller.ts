import { Request, Response } from 'express'
import { validateImages } from '@/utils/validateImages'

export const uploadImages = (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[]

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'Нет файлов' })
        }

        validateImages(files)

        const urls = files.map(file => `/static/${file.filename}`)

        return res.json({ urls })
    } catch (e: any) {
        return res.status(400).json({ message: e.message })
    }
}
