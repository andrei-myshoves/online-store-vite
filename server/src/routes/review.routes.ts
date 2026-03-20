import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware'
import { validate } from '@/middleware/validate.js'
import { createReview, getReviewsById } from '@/controllers/review.controller.js'
import { createReviewSchema } from '@/schemas/review.schema.js'

const router = Router()

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Создать отзыв
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text, rating, advertisementId]
 *             properties:
 *               text:
 *                 type: string
 *               rating:
 *                 type: number
 *               advertisementId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Отзыв создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Не авторизован
 */
router.post('/', authMiddleware, validate(createReviewSchema), createReview)

/**
 * @swagger
 * /reviews/comment/{id}:
 *   get:
 *     summary: Получить отзывы по объявлению
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID объявления
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список отзывов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */
router.get('/comment/:id', getReviewsById)

export default router
