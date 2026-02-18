import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware'
import { validate } from '@/middleware/validate.js'
import { createReview, getReviewsBySlug } from '@/controllers/review.controller.js'
import { createReviewSchema } from '@/schemas/review.schema.js'

const router = Router()

router.post('/', authMiddleware, validate(createReviewSchema), createReview)

router.get('/comment/:slug', getReviewsBySlug)

export default router
