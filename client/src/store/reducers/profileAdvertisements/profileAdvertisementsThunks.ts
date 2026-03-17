import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Advertisement } from '@/entities/advertisement/models/types'

type Response = {
    items: Advertisement[]
    total: number
    limit: number
    offset: number
}

export const fetchProfileAdvertisements = createAsyncThunk<
    Response,
    { userId: number; limit: number; offset: number },
    { rejectValue: string }
>('profileAdvertisements/fetch', async (params, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/advertisement', {
            params,
        })

        return data
    } catch {
        return rejectWithValue('Ошибка загрузки объявлений')
    }
})
