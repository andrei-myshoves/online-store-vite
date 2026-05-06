import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Advertisement } from '@/entities/advertisement/models/types'

type FetchCatalogArgs = {
    page: number
    limit: number
}

type CatalogResponse = {
    items: Advertisement[]
    total: number
}

export const fetchCatalog = createAsyncThunk<CatalogResponse, FetchCatalogArgs, { rejectValue: string }>(
    'catalog/fetch',
    async ({ page, limit }, thunkAPI) => {
        try {
            const offset = (page - 1) * limit

            const { data } = await api.get('/advertisement', {
                params: { limit, offset },
            })

            return data
        } catch {
            return thunkAPI.rejectWithValue('Ошибка загрузки объявлений')
        }
    }
)
