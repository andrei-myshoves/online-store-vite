import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware.js'
import { getProfile, updateProfile } from '../controllers/profile.controller'
import { validate } from '@/middleware/validate.js'
import { updateProfileSchema } from '@/schemas/profile.schema'

const router = Router()

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Получить профиль пользователя
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешно получен профиль
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Пользователь не найден
 */
router.get('/:id', authMiddleware, getProfile)

/**
 * @swagger
 * /profile/{id}:
 *   patch:
 *     summary: Обновить профиль пользователя
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               lastName:
 *                 type: string
 *                 nullable: true
 *               city:
 *                 type: string
 *                 nullable: true
 *               phone:
 *                 type: string
 *                 nullable: true
 *               avatar:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Профиль успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Пользователь не найден
 */
router.patch('/:id', authMiddleware, validate(updateProfileSchema), updateProfile)

export default router
