import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { findUserByEmail, createUser } from '../models/user.model.js'
import { generateToken } from '../utils/jwt.js'
import { RegisterInput, LoginInput } from '../types/index.js'
import { sanitizeUser } from '../utils/sanitizeUser.js'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, username }: RegisterInput = req.body

        if (!email || !password || !username) {
            res.status(400).json({
                success: false,
                message: 'Please provide email, password and username',
            })
            return
        }

        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'User with this email already exists',
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await createUser({
            email,
            password: hashedPassword,
            username,
        })

        const token = generateToken({
            userId: user.id,
            email: user.email,
        })

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: sanitizeUser(user),
        })
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
        })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: LoginInput = req.body

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            })
            return
        }

        const user = await findUserByEmail(email)
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
            return
        }

        const token = generateToken({
            userId: user.id,
            email: user.email,
        })

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: sanitizeUser(user),
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error during login',
        })
    }
}

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
            })
            return
        }

        const user = await findUserByEmail(req.user.email)
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            })
            return
        }

        res.status(200).json({
            success: true,
            user: sanitizeUser(user),
        })
    } catch (error) {
        console.error('GetMe error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}
