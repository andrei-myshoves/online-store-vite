import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Review } from '@/entities/advertisement/models/types'
import axios from 'axios'

interface FetchReviewsArgs {
    advertisementId: number
    page: number
    limit: number
}

interface ReviewsResponse {
    items: Review[]
    total: number
}

interface CreateReviewPayload {
    advertisementId: number
    text: string
    rating?: number
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

export const createReview = createAsyncThunk<Review, CreateReviewPayload, { rejectValue: string }>(
    'reviews/createReview',
    async (payload, thunkAPI) => {
        try {
            const { data } = await api.post('/reviews', payload)
            return data
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    return thunkAPI.rejectWithValue('Пользователь не авторизован')
                }

                if (error.response?.status === 400) {
                    return thunkAPI.rejectWithValue('Вы уже оставляли отзыв')
                }
            }

            return thunkAPI.rejectWithValue('Ошибка создания отзыва')
        }
    }
)
