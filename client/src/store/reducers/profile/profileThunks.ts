import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Profile } from '@/entities/advertisement/models/types'

export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: string }>(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}')
            const userId = user.id

            const { data } = await api.get(`/profile/${userId}`)
            return data
        } catch {
            return rejectWithValue('Ошибка загрузки профиля')
        }
    }
)

export const updateProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>(
    'profile/updateProfile',
    async (profile, { rejectWithValue }) => {
        try {
            const { data } = await api.patch(`/profile/${profile.id}`, profile)
            return data
        } catch {
            return rejectWithValue('Ошибка обновления профиля')
        }
    }
)
