import { Router } from 'express'
import { getSellerProfile, getSellerAdvertisements } from '@/controllers/seller.controller.js'
import { validateParams, validateQuery } from '@/middleware/validate'
import { sellerParamsSchema, sellerAdvertisementsQuerySchema } from '@/schemas/seller.schemas'

const router = Router()

router.get('/:sellerId', validateParams(sellerParamsSchema), getSellerProfile)

router.get(
    '/:sellerId/advertisements',
    validateParams(sellerParamsSchema),
    validateQuery(sellerAdvertisementsQuerySchema),
    getSellerAdvertisements
)

export default router
