import type { RootState } from '@/store/store'

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthModalOpen = (state: RootState) => state.auth.isAuthModalOpen
export const selectIsAuth = (state: RootState) => !!state.auth.user
