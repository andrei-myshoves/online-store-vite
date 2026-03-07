import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware.js'
import { getProfile, updateProfile } from '../controllers/profile.controller'
import { validate } from '@/middleware/validate.js'
import { updateProfileSchema } from '@/schemas/profile.schema'
const router = Router()

router.get('/:id', authMiddleware, getProfile)
router.patch('/:id', authMiddleware, validate(updateProfileSchema), updateProfile)

export default router
