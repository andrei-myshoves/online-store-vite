import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Profile } from '@/entities/advertisement/models/types'

export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: string }>(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<Profile>('/api/profile/1')
            return data
        } catch {
            return rejectWithValue('Ошибка загрузки профиля')
        }
    }
)
