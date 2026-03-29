import { createSlice } from '@reduxjs/toolkit'
import { createAdThunk } from './createAdvertisementThunks'

type CreateAdvertisementState = {
    isModalOpen: boolean
    loading: boolean
    error: string | null
    success: boolean | null
}

const initialState: CreateAdvertisementState = {
    isModalOpen: false,
    loading: false,
    error: null,
    success: null,
}

const createAdvertisementSlice = createSlice({
    name: 'createAdvertisement',
    initialState,
    reducers: {
        openModal: state => {
            state.isModalOpen = true
            state.success = null
        },
        closeModal: state => {
            state.isModalOpen = false
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
                state.isModalOpen = false
            })
            .addCase(createAdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { openModal, closeModal } = createAdvertisementSlice.actions
export default createAdvertisementSlice.reducer
