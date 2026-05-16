import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import type { Advertisement } from '../../../entities/advertisement/models/types'
import axios from 'axios'

export const fetchAdvertisementById = createAsyncThunk<Advertisement, string, { rejectValue: string }>(
    'advertisement/fetchById',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/advertisement/${id}`)
            return response.data
        } catch {
            return thunkAPI.rejectWithValue('Не удалось загрузить объявление')
        }
    }
)

type UpdateAdvertisementPayload = {
    id: number
    name: string
    description: string
    price: number
    images: (File | string)[]
}

export const updateAdvertisementThunk = createAsyncThunk<
    Advertisement,
    UpdateAdvertisementPayload,
    { rejectValue: string }
>('advertisement/update', async ({ id, name, description, price, images }, thunkAPI) => {
    try {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', String(price))

        const onlyFiles = images.filter((img): img is File => img instanceof File)

        onlyFiles.forEach(file => {
            formData.append('images', file)
        })

        const response = await api.patch(`/advertisement/${id}`, formData)

        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка обновления')
        }

        return thunkAPI.rejectWithValue('Ошибка обновления')
    }
})

export const unpublishAdvertisementThunk = createAsyncThunk('advertisement/unpublish', async (id: number, thunkAPI) => {
    try {
        const response = await api.patch(`/advertisement/${id}/unpublish`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка')
        }

        return thunkAPI.rejectWithValue('Ошибка')
    }
})
