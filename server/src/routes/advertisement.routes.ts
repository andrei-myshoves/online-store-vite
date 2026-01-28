import { Router } from 'express'
import { upload } from '../middleware/multer.js'
import { createAdvertisement } from '../controllers/advertisement.controller.js'

const router = Router()

router.post('/', upload.array('images', 5), createAdvertisement)

export default router
