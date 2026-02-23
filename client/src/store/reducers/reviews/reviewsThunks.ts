import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Review } from '@/entities/advertisement/models/types'

interface FetchReviewsArgs {
    advertisementId: number
    page: number
    limit: number
}

interface ReviewsResponse {
    items: Review[]
    total: number
}

export const fetchReviews = createAsyncThunk<ReviewsResponse, FetchReviewsArgs, { rejectValue: string }>(
    'reviews/fetchReviews',
    async ({ advertisementId, page, limit }, thunkAPI) => {
        try {
            const response = await api.get(`/reviews/comment/${advertisementId}`, {
                params: { page, limit },
            })

            return response.data
        } catch {
            return thunkAPI.rejectWithValue('Ошибка загрузки отзывов')
        }
    }
)
