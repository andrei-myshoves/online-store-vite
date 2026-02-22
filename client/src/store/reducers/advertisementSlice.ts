import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Advertisement } from '../../entities/advertisement/models/types'
import { fetchAdvertisementById } from './advertisementThunks'

interface AdvertisementState {
    data: Advertisement | null
    isLoading: boolean
    error: string | null
}

const initialState: AdvertisementState = {
    data: null,
    isLoading: false,
    error: null,
}

export const advertisementSlice = createSlice({
    name: 'advertisement',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAdvertisementById.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAdvertisementById.fulfilled, (state, action: PayloadAction<Advertisement>) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchAdvertisementById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Ошибка'
            })
    },
})

export default advertisementSlice.reducer
