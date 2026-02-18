import { z } from 'zod'

const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu

export const createReviewSchema = z.object({
    advertisementId: z.coerce.number().int().positive(),

    rating: z.coerce.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),

    text: z
        .string()
        .trim()
        .min(10, 'Review must be at least 10 characters')
        .max(400, 'Review must be at most 400 characters')
        .refine(val => !emojiRegex.test(val), {
            message: 'Emoji are not allowed',
        }),
})
