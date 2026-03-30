import type { RootState } from '@/store/store'

export const selectCreateAdLoading = (state: RootState) => state.createAdvertisement.loading

export const selectCreateAdError = (state: RootState) => state.createAdvertisement.error

export const selectCreateAdIsModalOpen = (state: RootState) => state.createAdvertisement.isModalOpen

export const selectCreateAdForm = (state: RootState) => state.createAdvertisement.form

export const selectCreateAdName = (state: RootState) => state.createAdvertisement.form.name

export const selectCreateAdDescription = (state: RootState) => state.createAdvertisement.form.description

export const selectCreateAdPrice = (state: RootState) => state.createAdvertisement.form.price
