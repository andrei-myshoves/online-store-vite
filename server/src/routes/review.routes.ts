import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware'
import { validate } from '@/middleware/validate.js'
import { createReview } from '@/controllers/review.controller.js'
import { createReviewSchema } from '@/schemas/review.schema.js'

const router = Router()

router.post('/', authMiddleware, validate(createReviewSchema), createReview)

export default router
