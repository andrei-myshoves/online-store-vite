import { createSlice } from '@reduxjs/toolkit'
import type { Profile } from '@/entities/advertisement/models/types'
import { fetchProfile } from './profileThunks'

interface ProfileState {
    data: Profile | null
    isLoading: boolean
    error: string | null
}

const initialState: ProfileState = {
    data: null,
    isLoading: false,
    error: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProfile.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = (action.payload as string) ?? 'Ошибка'
            })
    },
})

export default profileSlice.reducer
