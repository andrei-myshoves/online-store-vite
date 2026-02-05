import { z } from 'zod'

// POST /api/advertisement
export const createAdvertisementSchema = z.object({
    name: z
        .string({
            error: issue => (issue.input === undefined ? 'Name is required' : 'Name must be a string'),
        })
        .trim()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name must be at most 100 characters'),

    description: z
        .string({
            error: issue => (issue.input === undefined ? 'Description is required' : 'Description must be a string'),
        })
        .trim()
        .min(1, 'Description cannot be empty')
        .max(500, 'Description must be at most 500 characters'),

    price: z.coerce
        .number({
            error: issue => (typeof issue.input === 'number' ? undefined : 'Price must be a number'),
        })
        .positive('Price must be greater than 0'),
})

// PATCH /api/advertisement/:id
export const updateAdvertisementSchema = z.object({
    name: z
        .string({
            error: () => 'Name must be a string',
        })
        .trim()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name must be at most 100 characters')
        .optional(),

    description: z
        .string({
            error: () => 'Description must be a string',
        })
        .trim()
        .min(1, 'Description cannot be empty')
        .max(500, 'Description must be at most 500 characters')
        .optional(),

    price: z.coerce
        .number({
            error: () => 'Price must be a number',
        })
        .positive('Price must be greater than 0')
        .optional(),
})

// GET /api/advertisement
export const getAdvertisementsQuerySchema = z.object({
    limit: z.coerce
        .number({
            error: () => 'Limit must be a number',
        })
        .min(1, 'Limit must be at least 1')
        .max(100, 'Limit must be at most 100')
        .default(10),

    offset: z.coerce
        .number({
            error: () => 'Offset must be a number',
        })
        .min(0, 'Offset must be at least 0')
        .default(0),
})

export const advertisementIdParamSchema = z.object({
    id: z.coerce.number().int().positive('id must be a positive integer'),
})
