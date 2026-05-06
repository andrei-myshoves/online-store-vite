import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Advertisement } from '@/entities/advertisement/models/types'

type SearchArgs = {
    query: string
    limit: number
    offset: number
}

type SearchResponse = {
    data: Advertisement[]
    count: number
}

export const searchAdvertisements = createAsyncThunk<SearchResponse, SearchArgs, { rejectValue: string }>(
    'search/fetch',
    async ({ query, limit, offset }, thunkAPI) => {
        try {
            const { data } = await api.get('/advertisement/search', {
                params: {
                    q: query,
                    limit,
                    offset,
                },
            })

            return data
        } catch {
            return thunkAPI.rejectWithValue('Ошибка поиска')
        }
    }
)
