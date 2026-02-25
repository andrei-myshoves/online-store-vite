import { Router } from 'express'
import { getSellerProfile } from '@/controllers/seller.controller.js'

const router = Router()

router.get('/:sellerId', getSellerProfile)

export default router
