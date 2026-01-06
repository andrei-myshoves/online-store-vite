import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'
import { RegisterInput, LoginInput } from '../types/index.js'
import { sanitizeUser } from '../utils/sanitizeUser.js'
import { ApiError } from '../error/ApiError.js'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username }: RegisterInput = req.body

  if (!email || !password || !username) {
    throw ApiError.badRequest('Please provide email, password and username')
  }

  const existingUser = await User.findOne({ where: { email } })
  if (existingUser) {
    throw ApiError.badRequest('User with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    password: hashedPassword,
    username,
  })

  const token = generateToken({
    userId: user.id.toString(),
    email: user.email,
  })

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: sanitizeUser(user),
  })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginInput = req.body

  if (!email || !password) {
    throw ApiError.badRequest('Please provide email and password')
  }

  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password')
  }

  const token = generateToken({
    userId: user.id.toString(),
    email: user.email,
  })

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: sanitizeUser(user),
  })
}

export const getMe = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw ApiError.unauthorized()
  }

  const user = await User.findOne({ where: { email: req.user.email } })
  if (!user) {
    throw ApiError.badRequest('User not found')
  }

  res.status(200).json({
    success: true,
    user: sanitizeUser(user),
  })
}
