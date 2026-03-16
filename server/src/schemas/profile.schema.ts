import { z } from 'zod'

const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/

export const updateProfileSchema = z.object({
    username: z
        .string()
        .trim()
        .min(2, 'Username too short')
        .max(50)
        .regex(nameRegex, 'Username can contain only letters'),

    lastName: z
        .string()
        .trim()
        .min(2)
        .max(50)
        .regex(nameRegex, 'Last name can contain only letters')
        .nullable()
        .optional(),

    city: z.string().trim().min(2).max(100).regex(nameRegex, 'City can contain only letters').nullable().optional(),

    phone: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number')
        .nullable()
        .optional(),

    avatar: z.string().url().nullable().optional(),
})
