import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError'
import { verifyToken } from '../utils/jwt'

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw ApiError.unauthorized()
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        throw ApiError.unauthorized()
    }

    const user = verifyToken(token)
    req.user = user

    next()
}
