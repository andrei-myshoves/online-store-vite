import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectCatalogState = (state: RootState) => state.catalog

export const selectCatalogData = createSelector([selectCatalogState], catalog => ({
    items: catalog.items,
    page: catalog.page,
    total: catalog.total,
    isLoading: catalog.isLoading,
    error: catalog.error,
}))
