import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAdvertisement } from '@/shared/api/advertisement'
import type { CreateAdvertisementDto, CreateAdvertisementResponse } from '@/shared/api/advertisement'

export const createAdThunk = createAsyncThunk<
    CreateAdvertisementResponse,
    CreateAdvertisementDto,
    { rejectValue: string }
>('createAd/createAd', async (data, { rejectWithValue }) => {
    try {
        const response = await createAdvertisement(data)
        return response
    } catch (e: any) {
        return rejectWithValue(e.message || 'Ошибка создания объявления')
    }
})
