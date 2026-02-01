import { Router } from 'express'
import { createAdvertisement, getAdvertisements } from '../controllers/advertisement.controller.js'
import { authMiddleware } from '@/middleware/authMiddleware'
import { updateAdvertisement } from '@/controllers/advertisement.controller'

const router = Router()

router.post('/', createAdvertisement)
router.get('/', getAdvertisements)

router.patch('/:id', authMiddleware, updateAdvertisement)

export default router
