import { Router } from 'express'
import { createAdvertisement, getAdvertisements, deleteAdvertisement } from '../controllers/advertisement.controller.js'
import { authMiddleware } from '@/middleware/authMiddleware'
import { updateAdvertisement } from '@/controllers/advertisement.controller'
import { validate, validateParams, validateQuery } from '../middleware/validate.js'
import { withTypedQuery } from '@/middleware/withTypedQuery.js'
import {
    createAdvertisementSchema,
    updateAdvertisementSchema,
    getAdvertisementsQuerySchema,
    advertisementIdParamSchema,
} from '../schemas/advertisement.schema.js'
import type { GetAdvertisementsQuery } from '../schemas/advertisement.schema.js'
import { checkAdvertisementOwner } from '@/middleware/checkAdvertisementOwner.js'
import { getAdvertisementById } from '../controllers/advertisement.controller'

const router = Router()

/**
 * @swagger
 * /advertisement:
 *   post:
 *     summary: Создать объявление
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, city, images]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               city:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Объявление создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       401:
 *         description: Не авторизован
 */
router.post('/', authMiddleware, validate(createAdvertisementSchema), createAdvertisement)

/**
 * @swagger
 * /advertisement:
 *   get:
 *     summary: Получить список объявлений
 *     tags: [Advertisement]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 8
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Список объявлений
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
 */
router.get('/', validateQuery(getAdvertisementsQuerySchema), withTypedQuery<GetAdvertisementsQuery>(getAdvertisements))

/**
 * @swagger
 * /advertisement/{id}:
 *   get:
 *     summary: Получить объявление по ID
 *     tags: [Advertisement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Объявление
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: Не найдено
 */
router.get('/:id', validateParams(advertisementIdParamSchema), getAdvertisementById)

/**
 * @swagger
 * /advertisement/{id}:
 *   patch:
 *     summary: Обновить объявление
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Не найдено
 */
router.patch('/:id', authMiddleware, validate(updateAdvertisementSchema), checkAdvertisementOwner, updateAdvertisement)

/**
 * @swagger
 * /advertisement/{id}:
 *   delete:
 *     summary: Удалить объявление
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Удалено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Не найдено
 */
router.delete(
    '/:id',
    authMiddleware,
    validateParams(advertisementIdParamSchema),
    checkAdvertisementOwner,
    deleteAdvertisement
)

export default router
