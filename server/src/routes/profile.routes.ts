import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware.js'
import { getProfile } from '../controllers/profile.controller'
const router = Router()

router.get('/:id', authMiddleware, getProfile)

export default router
