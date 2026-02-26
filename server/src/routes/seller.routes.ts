import { Router } from 'express'
import { getSellerProfile } from '@/controllers/seller.controller.js'
import { validateParams } from '@/middleware/validate'
import { sellerParamsSchema } from '@/schemas/seller.schemas'

const router = Router()

router.get('/:sellerId', validateParams(sellerParamsSchema), getSellerProfile)

export default router
