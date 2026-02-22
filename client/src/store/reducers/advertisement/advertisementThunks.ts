import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Advertisement } from '../../../entities/advertisement/models/types'

export const fetchAdvertisementById = createAsyncThunk<Advertisement, string, { rejectValue: string }>(
    'advertisement/fetchById',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/advertisement/${id}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить объявление')
        }
    }
)
