import { createSlice } from '@reduxjs/toolkit'
import { createAdThunk } from './createAdvertisementThunks'

type CreateAdvertisementState = {
    isOpen: boolean
    loading: boolean
    error: string | null
    success: boolean
}

const initialState: CreateAdvertisementState = {
    isOpen: false,
    loading: false,
    error: null,
    success: false,
}

const createAdvertisementSlice = createSlice({
    name: 'createAdvertisement',
    initialState,
    reducers: {
        openModal: state => {
            state.isOpen = true
            state.success = true
        },
        closeModal: state => {
            state.isOpen = false
            state.error = null
            state.success = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createAdThunk.pending, state => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(createAdThunk.fulfilled, state => {
                state.loading = false
                state.success = true
            })
            .addCase(createAdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { openModal, closeModal } = createAdvertisementSlice.actions
export default createAdvertisementSlice.reducer
