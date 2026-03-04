import { createSlice } from '@reduxjs/toolkit'
import { fetchSellerProfile, fetchSellerAdvertisements } from './sellerThunks'

interface SellerState {
    profile: any | null
    advertisements: any[]
    total: number
    page: number
    isProfileLoading: boolean
    isAdvertisementsLoading: boolean
    error: string | null
}

const initialState: SellerState = {
    profile: null,
    advertisements: [],
    total: 0,
    page: 1,
    isProfileLoading: false,
    isAdvertisementsLoading: false,
    error: null,
}

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        },
        clearSeller(state) {
            state.profile = null
            state.advertisements = []
            state.total = 0
            state.page = 1
            state.error = null
        },
    },
    extraReducers: builder => {
        builder

            .addCase(fetchSellerProfile.pending, state => {
                state.isProfileLoading = true
                state.error = null
            })
            .addCase(fetchSellerProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.isProfileLoading = false
            })
            .addCase(fetchSellerProfile.rejected, (state, action) => {
                state.isProfileLoading = false
                state.error = action.payload as string
            })

            .addCase(fetchSellerAdvertisements.pending, state => {
                state.isAdvertisementsLoading = true
                state.error = null
            })
            .addCase(fetchSellerAdvertisements.fulfilled, (state, action) => {
                state.advertisements = action.payload.items
                state.total = action.payload.total
                state.page = action.payload.page
                state.isAdvertisementsLoading = false
            })
            .addCase(fetchSellerAdvertisements.rejected, (state, action) => {
                state.isAdvertisementsLoading = false
                state.error = action.payload as string
            })
    },
})

export const { setPage, clearSeller } = sellerSlice.actions
export default sellerSlice.reducer
