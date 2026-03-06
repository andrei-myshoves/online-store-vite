import { Router } from 'express'
import authRoutes from './auth.routes.js'
import advertisementRoutes from './advertisement.routes.js'
import reviewRouter from './review.routes.js'
import sellerRouter from './seller.routes.js'
import userRoutes from './user.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/advertisement', advertisementRoutes)
router.use('/reviews', reviewRouter)
router.use('/seller', sellerRouter)
router.use('/users', userRoutes)

export default router
