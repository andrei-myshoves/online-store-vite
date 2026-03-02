import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectSellerState = (state: RootState) => state.seller

export const selectSellerData = createSelector([selectSellerState], seller => ({
    profile: seller.profile,
    advertisements: seller.advertisements,
    total: seller.total,
    page: seller.page,
    isLoading: seller.isLoading,
    error: seller.error,
}))
