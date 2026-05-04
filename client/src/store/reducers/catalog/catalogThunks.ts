import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Advertisement } from '@/entities/advertisement/models/types'

type FetchCatalogArgs = {
    page: number
    limit: number
    q?: string
}

type CatalogResponse = {
    items: Advertisement[]
    total: number
}

export const fetchCatalog = createAsyncThunk<CatalogResponse, FetchCatalogArgs, { rejectValue: string }>(
    'catalog/fetch',
    async ({ page, limit, q }, thunkAPI) => {
        try {
            const offset = (page - 1) * limit

            if (q && q.trim()) {
                const { data } = await api.get('/advertisement/search', {
                    params: {
                        q,
                        limit,
                        offset,
                    },
                })

                return {
                    items: data.data,
                    total: data.count,
                }
            }

            const { data } = await api.get('/advertisement', {
                params: { limit, offset },
            })

            return data
        } catch {
            return thunkAPI.rejectWithValue('Ошибка загрузки объявлений')
        }
    }
)
