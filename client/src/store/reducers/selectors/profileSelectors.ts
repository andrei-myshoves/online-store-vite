import type { RootState } from '@/store/store'

export const selectProfile = (state: RootState) => state.profile.data

export const selectProfileLoading = (state: RootState) => state.profile.isLoading

export const selectProfileError = (state: RootState) => state.profile.error

export const selectIsEditingProfile = (state: RootState) => state.profile.isEditingProfile
