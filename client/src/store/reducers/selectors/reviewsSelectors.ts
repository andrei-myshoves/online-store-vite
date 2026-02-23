import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

export const selectReviewsState = (state: RootState) => state.reviews

export const selectReviewsViewModel = createSelector([selectReviewsState], reviews => ({
    items: reviews.items,
    page: reviews.page,
    total: reviews.total,
    isLoading: reviews.isLoading,
    error: reviews.error,
    createLoading: reviews.createLoading,
    createError: reviews.createError,
    hasMore: reviews.items.length < reviews.total,
}))
