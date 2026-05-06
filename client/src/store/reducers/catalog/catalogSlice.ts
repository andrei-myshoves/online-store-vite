import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { fetchCatalog } from './catalogThunks'
import { searchAdvertisements } from '@/store/reducers/search/searchThunks'

interface CatalogState {
    items: Advertisement[]
    page: number
    total: number
    isLoading: boolean
    error: string | null
}

const initialState: CatalogState = {
    items: [],
    page: 1,
    total: 0,
    isLoading: false,
    error: null,
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCatalog.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchCatalog.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.items
                state.total = action.payload.total
            })
            .addCase(fetchCatalog.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Ошибка'
            })
            .addCase(searchAdvertisements.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(searchAdvertisements.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.data
                state.total = action.payload.count
            })
            .addCase(searchAdvertisements.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Ошибка поиска'
            })
    },
})

export const { setPage } = catalogSlice.actions
export default catalogSlice.reducer
