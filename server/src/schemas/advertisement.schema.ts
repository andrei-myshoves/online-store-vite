import { z } from 'zod'

// POST /api/advertisement
export const createAdvertisementSchema = z.object({
    name: z.string().min(1).max(100).trim(),
    description: z.string().min(1).max(500).trim(),
    price: z.coerce.number().positive(),
})

// PATCH /api/advertisement/:id
export const updateAdvertisementSchema = z.object({
    name: z.string().min(1).max(100).trim().optional(),
    description: z.string().min(1).max(500).trim().optional(),
    price: z.coerce.number().positive().optional(),
})

// GET /api/advertisement
export const getAdvertisementsQuerySchema = z.object({
    limit: z.coerce.number().min(1).max(100).default(10),
    offset: z.coerce.number().min(0).default(0),
})
