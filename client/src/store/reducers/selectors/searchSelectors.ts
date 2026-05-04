import type { RootState } from '@/store/store'

export const selectSearchQuery = (state: RootState) => state.search.query
