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

export const updateAdvertisementThunk = createAsyncThunk(
    'advertisement/update',
    async ({ id, name, description, price, images }: any) => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', String(price))

        images.forEach((img: File) => {
            formData.append('images', img)
        })

        const response = await api.patch(`/advertisement/${id}`, formData)

        return response.data
    }
)

export const unpublishAdvertisementThunk = createAsyncThunk('advertisement/unpublish', async (id: number, thunkAPI) => {
    try {
        const response = await api.patch(`/advertisement/${id}/unpublish`)
        return response.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка')
    }
})
