import jwt, { SignOptions } from 'jsonwebtoken'
import { JWTPayload } from '../types'

const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET is not defined')
    }
    return secret
}

const getJwtExpire = (): SignOptions['expiresIn'] => (process.env.JWT_EXPIRE as SignOptions['expiresIn']) ?? '7d'

export const generateToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: getJwtExpire(),
    })
}

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, getJwtSecret()) as JWTPayload
}
