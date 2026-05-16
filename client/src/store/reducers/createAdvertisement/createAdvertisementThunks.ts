import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAdvertisement } from '@/shared/api/advertisement'
import type { CreateAdvertisementDto, CreateAdvertisementResponse } from '@/shared/api/advertisement'
import axios from 'axios'

export const createAdThunk = createAsyncThunk<
    CreateAdvertisementResponse,
    CreateAdvertisementDto,
    { rejectValue: string }
>('createAd/createAd', async (data, { rejectWithValue }) => {
    try {
        const response = await createAdvertisement(data)

        return response
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка создания объявления')
        }

        return rejectWithValue('Ошибка создания объявления')
    }
})
