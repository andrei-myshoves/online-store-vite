import jwt, { SignOptions } from 'jsonwebtoken'
import { JWTPayload } from '../types/index.js'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
}

const JWT_EXPIRE: SignOptions['expiresIn'] = (process.env.JWT_EXPIRE as SignOptions['expiresIn']) ?? '7d'

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
