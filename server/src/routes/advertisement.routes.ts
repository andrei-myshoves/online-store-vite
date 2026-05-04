import { Router } from 'express'
import {
    createAdvertisement,
    getAdvertisements,
    deleteAdvertisement,
    unpublishAdvertisement,
    searchAdvertisements,
} from '../controllers/advertisement.controller.js'
import { authMiddleware } from '@/middleware/authMiddleware'
import { updateAdvertisement } from '@/controllers/advertisement.controller'
import { validate, validateParams, validateQuery } from '../middleware/validate.js'
import { withTypedQuery } from '@/middleware/withTypedQuery.js'
import {
    updateAdvertisementSchema,
    getAdvertisementsQuerySchema,
    advertisementIdParamSchema,
} from '../schemas/advertisement.schema.js'
import type { GetAdvertisementsQuery } from '../schemas/advertisement.schema.js'
import { checkAdvertisementOwner } from '@/middleware/checkAdvertisementOwner.js'
import { getAdvertisementById } from '../controllers/advertisement.controller'
import { upload } from '@/middleware/upload.middleware'

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, description, price, city]
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
 *                   format: binary
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
router.post('/', authMiddleware, upload.array('images'), createAdvertisement)

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
 * /advertisement/search:
 *   get:
 *     summary: Поиск объявлений
 *     description: Поиск по названию и описанию (ILIKE), только опубликованные объявления
 *     tags: [Advertisement]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Поисковая строка
 *         example: iphone
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Результаты поиска
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Advertisement'
 *                 count:
 *                   type: integer
 *       500:
 *         description: Ошибка сервера
 */
router.get('/search', searchAdvertisements)

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
 *       required: false
 *       content:
 *         multipart/form-data:
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Объявление обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Не найдено
 */

router.patch(
    '/:id',
    authMiddleware,
    upload.array('images'),
    validate(updateAdvertisementSchema),
    checkAdvertisementOwner,
    updateAdvertisement
)

/**
 * @swagger
 * /advertisement/{id}/unpublish:
 *   patch:
 *     summary: Снять объявление с публикации
 *     description: Устанавливает isPublished = false. Доступно только автору объявления.
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID объявления
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Объявление успешно снято с публикации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 advertisement:
 *                   $ref: '#/components/schemas/Advertisement'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет доступа (не владелец)
 *       404:
 *         description: Объявление не найдено
 */
router.patch(
    '/:id/unpublish',
    authMiddleware,
    validateParams(advertisementIdParamSchema),
    checkAdvertisementOwner,
    unpublishAdvertisement
)

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
