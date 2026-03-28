import type { RootState } from '@/store/store'

export const selectCreateAdLoading = (state: RootState) => state.createAdvertisement.loading

export const selectCreateAdError = (state: RootState) => state.createAdvertisement.error

export const selectCreateAdSuccess = (state: RootState) => state.createAdvertisement.success
