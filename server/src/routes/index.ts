import { Router } from 'express'
import authRoutes from './auth.routes.js'
import advertisementRoutes from './advertisement.routes.js'
import reviewRouter from './review.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/advertisement', advertisementRoutes)
router.use('/reviews', reviewRouter)

export default router
