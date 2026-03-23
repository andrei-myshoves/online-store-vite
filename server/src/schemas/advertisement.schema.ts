import { z } from 'zod'

// POST /api/advertisement
export const createAdvertisementSchema = z
    .object({
        name: z
            .string({
                error: issue => (issue.input === undefined ? 'Name is required' : 'Name must be a string'),
            })
            .trim()
            .min(1, 'Name cannot be empty')
            .max(100, 'Name must be at most 100 characters'),

        description: z
            .string({
                error: issue =>
                    issue.input === undefined ? 'Description is required' : 'Description must be a string',
            })
            .trim()
            .min(1, 'Description cannot be empty')
            .max(500, 'Description must be at most 500 characters'),

        type: z.enum(['sale', 'free'], {
            error: () => 'Type must be either sale or free',
        }),

        price: z.coerce
            .number({
                error: () => 'Price must be a number',
            })
            .optional(),

        city: z
            .string({
                error: issue => (issue.input === undefined ? 'City is required' : 'City must be a string'),
            })
            .trim()
            .min(2, 'City must be at least 2 characters')
            .max(100, 'City must be at most 100 characters'),
    })
    .superRefine((data, ctx) => {
        if (data.type === 'sale') {
            if (data.price === undefined) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['price'],
                    message: 'Price is required for sale',
                })
            } else if (data.price <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['price'],
                    message: 'Price must be greater than 0',
                })
            }
        }

        if (data.type === 'free') {
            if (data.price !== undefined && data.price !== 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['price'],
                    message: 'Price must be 0 or not provided for free items',
                })
            }
        }
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
    city: z
        .string({
            error: () => 'City must be a string',
        })
        .trim()
        .min(2, 'City must be at least 2 characters')
        .max(100, 'City must be at most 100 characters')
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

    userId: z.coerce
        .number({
            error: () => 'UserId must be a number',
        })
        .int()
        .positive('UserId must be a positive number')
        .optional(),
})

export type GetAdvertisementsQuery = z.infer<typeof getAdvertisementsQuerySchema>

export const advertisementIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'id must be a number'),
})
