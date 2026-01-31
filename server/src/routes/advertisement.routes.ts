import { Router } from 'express'
import { createAdvertisement } from '../controllers/advertisement.controller.js'

const router = Router()

router.post('/', createAdvertisement)

export default router
