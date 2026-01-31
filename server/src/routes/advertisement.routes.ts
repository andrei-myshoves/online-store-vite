import { Router } from 'express'
import { createAdvertisement, getAdvertisements } from '../controllers/advertisement.controller.js'

const router = Router()

router.post('/', createAdvertisement)
router.get('/', getAdvertisements)

export default router
