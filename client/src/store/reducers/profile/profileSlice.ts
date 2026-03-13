import { createSlice } from '@reduxjs/toolkit'
import type { Profile } from '@/entities/advertisement/models/types'
import { fetchProfile, updateProfile } from './profileThunks'

interface ProfileState {
    data: Profile | null
    isLoading: boolean
    error: string | null
    isEditingProfile: boolean
}

const initialState: ProfileState = {
    data: null,
    isLoading: false,
    error: null,
    isEditingProfile: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeUsername: (state, action) => {
            if (state.isEditingProfile && state.data) {
                state.data.username = action.payload
            }
        },
        changeLastName: (state, action) => {
            if (state.isEditingProfile && state.data) {
                state.data.lastName = action.payload
            }
        },
        changeCity: (state, action) => {
            if (state.isEditingProfile && state.data) {
                state.data.city = action.payload
            }
        },
        changePhone: (state, action) => {
            if (state.isEditingProfile && state.data) {
                state.data.phone = action.payload
            }
        },
        enableProfileEditing: state => {
            state.isEditingProfile = true
        },
    },
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
            .addCase(updateProfile.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                state.isEditingProfile = false
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Ошибка'
            })
    },
})

export const { changeUsername, changeLastName, changeCity, changePhone, enableProfileEditing } = profileSlice.actions

export default profileSlice.reducer
