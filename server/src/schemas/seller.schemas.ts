import { z } from 'zod'

export const sellerParamsSchema = z.object({
    sellerId: z.string().regex(/^\d+$/, 'sellerId must be a number'),
})
