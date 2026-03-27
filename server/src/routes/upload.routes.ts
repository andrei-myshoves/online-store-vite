import { Router } from 'express'
import { upload } from '@/middleware/upload.middleware'
import { uploadImages } from '@/controllers/upload.controller'

const router = Router()

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Загрузка изображений объявления
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Изображения успешно загружены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: https://bucket.s3.amazonaws.com/file.jpg
 *       400:
 *         description: Ошибка валидации (размер, формат, количество)
 */
router.post('/', upload.array('images', 5), uploadImages)

export default router
