import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

const uploadPath = 'static/advertisements/'

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath)
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${uuid()}${ext}`)
    },
})

export const upload = multer({
    storage,
})
