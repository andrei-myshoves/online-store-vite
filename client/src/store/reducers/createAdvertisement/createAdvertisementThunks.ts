import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAdvertisement } from '@/shared/api/advertisement'
import type { CreateAdvertisementDto } from '@/shared/api/advertisement'

export const createAdThunk = createAsyncThunk(
    'advertisement/create',
    async (data: CreateAdvertisementDto, { rejectWithValue }) => {
        try {
            const response = await createAdvertisement(data)
            return response
        } catch (e: any) {
            return rejectWithValue(e.response?.data || 'Failed to create advertisement')
        }
    }
)
