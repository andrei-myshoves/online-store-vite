import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { Request, Response, NextFunction } from 'express'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'static/')
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${uuid()}${ext}`)
    },
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

export const multerErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'Файл слишком большой (до 5MB)',
            })
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: 'Слишком много файлов (макс 5)',
            })
        }
    }

    return next(err)
}
