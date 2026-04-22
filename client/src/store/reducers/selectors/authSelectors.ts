import type { RootState } from '@/store/store'

export const selectCurrentUser = (state: RootState) => state.auth.user
