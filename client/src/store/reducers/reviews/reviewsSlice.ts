import { createSlice } from '@reduxjs/toolkit'
import type { Review } from '@/entities/advertisement/models/types'
import { fetchReviews } from './reviewsThunks'

interface ReviewsState {
    items: Review[]
    page: number
    total: number
    isLoading: boolean
    error: string | null
}

const initialState: ReviewsState = {
    items: [],
    page: 1,
    total: 0,
    isLoading: false,
    error: null,
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        resetReviews: state => {
            state.items = []
            state.page = 1
            state.total = 0
            state.error = null
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchReviews.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false

                if (state.page === 1) {
                    state.items = action.payload.items
                } else {
                    state.items.push(...action.payload.items)
                }

                state.total = action.payload.total
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Ошибка'
            })
    },
})

export const { resetReviews, setPage } = reviewsSlice.actions
export default reviewsSlice.reducer
