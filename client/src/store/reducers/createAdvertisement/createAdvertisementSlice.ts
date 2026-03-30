import { createSlice } from '@reduxjs/toolkit'
import { createAdThunk } from './createAdvertisementThunks'

type CreateAdvertisementState = {
    isModalOpen: boolean
    loading: boolean
    error: string | null
}

const initialState: CreateAdvertisementState = {
    isModalOpen: false,
    loading: false,
    error: null,
}

const createAdvertisementSlice = createSlice({
    name: 'createAdvertisement',
    initialState,
    reducers: {
        openModal: state => {
            state.isModalOpen = true
        },
        closeModal: state => {
            state.isModalOpen = false
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
                state.isModalOpen = false
            })
            .addCase(createAdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Ошибка'
            })
    },
})

export const { openModal, closeModal } = createAdvertisementSlice.actions
export default createAdvertisementSlice.reducer
