import { Router } from 'express'
import { createAdvertisement, getAdvertisements, deleteAdvertisement } from '../controllers/advertisement.controller.js'
import { authMiddleware } from '@/middleware/authMiddleware'
import { updateAdvertisement } from '@/controllers/advertisement.controller'
import { validate, validateParams, validateQuery } from '../middleware/validate.js'
import { withTypedQuery } from '@/middleware/withTypedQuery.js'
import {
    createAdvertisementSchema,
    updateAdvertisementSchema,
    getAdvertisementsQuerySchema,
    advertisementIdParamSchema,
} from '../schemas/advertisement.schema.js'
import type { GetAdvertisementsQuery } from '../schemas/advertisement.schema.js'
import { checkAdvertisementOwner } from '@/middleware/checkAdvertisementOwner.js'
import { getAdvertisementById } from '../controllers/advertisement.controller'

const router = Router()

router.post('/', authMiddleware, validate(createAdvertisementSchema), createAdvertisement)

router.patch('/:id', authMiddleware, validate(updateAdvertisementSchema), checkAdvertisementOwner, updateAdvertisement)

router.get('/', validateQuery(getAdvertisementsQuerySchema), withTypedQuery<GetAdvertisementsQuery>(getAdvertisements))

router.get('/:id', validateParams(advertisementIdParamSchema), getAdvertisementById)

router.delete(
    '/:id',
    authMiddleware,
    validateParams(advertisementIdParamSchema),
    checkAdvertisementOwner,
    deleteAdvertisement
)

export default router
