import { Router } from 'express'
import { createAdvertisement, getAdvertisements } from '../controllers/advertisement.controller.js'
import { authMiddleware } from '@/middleware/authMiddleware'
import { updateAdvertisement } from '@/controllers/advertisement.controller'
import { validate, validateQuery } from '../middleware/validate.js'
import {
    createAdvertisementSchema,
    updateAdvertisementSchema,
    getAdvertisementsQuerySchema,
} from '../schemas/advertisement.schema.js'

const router = Router()

router.post('/', authMiddleware, validate(createAdvertisementSchema), createAdvertisement)

router.patch('/:id', authMiddleware, validate(updateAdvertisementSchema), updateAdvertisement)

router.get('/', validateQuery(getAdvertisementsQuerySchema), getAdvertisements)

export default router
