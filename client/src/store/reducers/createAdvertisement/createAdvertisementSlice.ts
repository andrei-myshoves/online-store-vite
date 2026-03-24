import { createSlice } from '@reduxjs/toolkit'
import { createAdThunk } from './createAdvertisementThunks'

type CreateAdvertisementState = {
    isOpen: boolean
    loading: boolean
    error: string | null
}

const initialState: CreateAdvertisementState = {
    isOpen: false,
    loading: false,
    error: null,
}

const createAdvertisementSlice = createSlice({
    name: 'createAdvertisement',
    initialState,
    reducers: {
        openModal: state => {
            state.isOpen = true
        },
        closeModal: state => {
            state.isOpen = false
            state.error = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createAdThunk.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(createAdThunk.fulfilled, state => {
                state.loading = false
                state.isOpen = false
            })
            .addCase(createAdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { openModal, closeModal } = createAdvertisementSlice.actions
export default createAdvertisementSlice.reducer
