import { z } from 'zod'

const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/

export const updateUserSchema = z.object({
    username: z
        .string()
        .trim()
        .min(2, 'Username too short')
        .max(50)
        .regex(nameRegex, 'Username can contain only letters'),

    lastName: z.string().trim().min(2).max(50).regex(nameRegex, 'Last name can contain only letters').optional(),

    city: z.string().trim().min(2).max(100).regex(nameRegex, 'City can contain only letters').optional(),

    phone: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number')
        .optional(),

    avatar: z.string().url().optional(),
})
