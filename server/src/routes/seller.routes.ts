import { Router } from 'express'
import { getSellerProfile, getSellerAdvertisements } from '@/controllers/seller.controller.js'
import { validateParams, validateQuery } from '@/middleware/validate'
import { sellerParamsSchema, sellerAdvertisementsQuerySchema } from '@/schemas/seller.schemas'

const router = Router()

/**
 * @swagger
 * /seller/{sellerId}:
 *   get:
 *     summary: Получить профиль продавца
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         description: ID продавца
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Профиль продавца
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       404:
 *         description: Продавец не найден
 */
router.get('/:sellerId', validateParams(sellerParamsSchema), getSellerProfile)

/**
 * @swagger
 * /seller/{sellerId}/advertisements:
 *   get:
 *     summary: Получить объявления продавца
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         description: ID продавца
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Количество элементов
 *         schema:
 *           type: integer
 *           example: 8
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Смещение (для пагинации)
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Список объявлений продавца
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Advertisement'
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 offset:
 *                   type: integer
 *       404:
 *         description: Продавец не найден
 */
router.get(
    '/:sellerId/advertisements',
    validateParams(sellerParamsSchema),
    validateQuery(sellerAdvertisementsQuerySchema),
    getSellerAdvertisements
)

export default router
