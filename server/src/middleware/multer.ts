import multer from 'multer'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'static')
    },
    filename: (_req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname
        cb(null, uniqueName)
    },
})

export const upload = multer({ storage })
