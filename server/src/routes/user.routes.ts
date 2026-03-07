import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware.js'
import { getCurrentUser, updateCurrentUser } from '../controllers/user.controller.js'
import { updateUserSchema } from '@/schemas/user.schema.js'
import { validate } from '@/middleware/validate.js'

const router = Router()

router.get('/me', authMiddleware, getCurrentUser)
router.patch('/me', authMiddleware, validate(updateUserSchema), updateCurrentUser)

export default router
