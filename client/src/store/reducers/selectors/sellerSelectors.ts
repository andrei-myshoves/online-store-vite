import type { RootState } from '@/store/store'

export const selectSellerProfile = (state: RootState) => state.seller.profile

export const selectSellerAdvertisements = (state: RootState) => state.seller.advertisements

export const selectSellerTotal = (state: RootState) => state.seller.total

export const selectSellerPage = (state: RootState) => state.seller.page

export const selectSellerProfileLoading = (state: RootState) => state.seller.isProfileLoading

export const selectSellerAdvertisementsLoading = (state: RootState) => state.seller.isAdvertisementsLoading

export const selectSellerError = (state: RootState) => state.seller.error
