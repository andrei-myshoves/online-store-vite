import type { RootState } from '@/store/store'

export const selectProfileAdvertisements = (state: RootState) => state.profileAdvertisements.items

export const selectProfileAdvertisementsLoading = (state: RootState) => state.profileAdvertisements.isLoading

export const selectProfileAdvertisementsItems = (state: RootState) => state.profileAdvertisements.items

export const selectProfileAdvertisementsError = (state: RootState) => state.profileAdvertisements.error

export const selectProfileAdvertisementsPage = (state: RootState) => state.profileAdvertisements.page

export const selectProfileAdvertisementsTotal = (state: RootState) => state.profileAdvertisements.total

export const selectProfileAdvertisementsLimit = (state: RootState) => state.profileAdvertisements.limit

export const selectProfileAdvertisementsOffset = (state: RootState) => state.profileAdvertisements.offset
