import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

export const selectAdvertisementState = (state: RootState) => state.advertisement

export const selectAdvertisementData = createSelector([selectAdvertisementState], advertisement => ({
    data: advertisement.data,
    isLoading: advertisement.isLoading,
    error: advertisement.error,
}))
