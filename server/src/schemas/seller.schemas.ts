import { z } from 'zod'

export const sellerParamsSchema = z.object({
    sellerId: z.string().regex(/^\d+$/, 'sellerId must be a number'),
})

export const sellerAdvertisementsQuerySchema = z.object({
    limit: z.string().regex(/^\d+$/).optional(),
    offset: z.string().regex(/^\d+$/).optional(),
})
