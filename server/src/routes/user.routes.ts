import { Router } from 'express'
import { authMiddleware } from '@/middleware/authMiddleware.js'
import User from '../models/User.js'

const router = Router()

router.get('/me', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'city', 'avatar', 'createdAt'],
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json(user)
    } catch (e) {
        next(e)
        return
    }
})

export default router
