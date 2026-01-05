import jwt, { SignOptions } from 'jsonwebtoken'
import { JWTPayload } from '../types/index.js'

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'your_secret_key'

const JWT_EXPIRE: SignOptions['expiresIn'] = (process.env.JWT_EXPIRE as SignOptions['expiresIn']) || '7d'

export const generateToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    })
}

export const verifyToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch {
        throw new Error('Invalid or expired token')
    }
}
