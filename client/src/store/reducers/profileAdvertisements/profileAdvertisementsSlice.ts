import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { fetchProfileAdvertisements } from './profileAdvertisementsThunks'

interface ProfileAdvertisementsState {
    items: Advertisement[]
    total: number
    page: number
    limit: number
    offset: number
    isLoading: boolean
    error: string | null
}

const initialState: ProfileAdvertisementsState = {
    items: [],
    total: 0,
    page: 1,
    limit: 8,
    offset: 0,
    isLoading: false,
    error: null,
}

export const profileAdvertisementsSlice = createSlice({
    name: 'profileAdvertisements',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
            state.offset = (action.payload - 1) * state.limit
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfileAdvertisements.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProfileAdvertisements.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.items
                state.total = action.payload.total
            })
            .addCase(fetchProfileAdvertisements.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Ошибка'
            })
    },
})

export const { setPage } = profileAdvertisementsSlice.actions
export default profileAdvertisementsSlice.reducer
