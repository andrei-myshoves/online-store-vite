import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Profile } from '@/entities/advertisement/models/types'

export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: string }>(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/profile/1')
            return data
        } catch {
            return rejectWithValue('Ошибка загрузки профиля')
        }
    }
)

export const updateProfile = createAsyncThunk<Profile, Partial<Profile>, { rejectValue: string }>(
    'profile/updateProfile',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.patch('/profile/1', payload)
            return data
        } catch {
            return rejectWithValue('Ошибка обновления профиля')
        }
    }
)
