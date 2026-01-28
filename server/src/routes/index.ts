import { Router } from 'express'
import authRoutes from './auth.routes.js'
import advertisementRoutes from './advertisement.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/advertisement', advertisementRoutes)

export default router
