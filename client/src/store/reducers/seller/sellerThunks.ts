import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import axios from 'axios'

export const fetchSellerProfile = createAsyncThunk(
    'seller/fetchProfile',
    async (sellerId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/seller/${sellerId}`)
            return response.data
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки профиля')
            }

            return rejectWithValue('Ошибка загрузки профиля')
        }
    }
)

export const fetchSellerAdvertisements = createAsyncThunk(
    'seller/fetchAdvertisements',
    async ({ sellerId, page }: { sellerId: string; page: number }, { rejectWithValue }) => {
        try {
            const limit = 8
            const offset = (page - 1) * limit

            const response = await api.get(`/seller/${sellerId}/advertisements`, {
                params: { limit, offset },
            })

            return {
                items: response.data.items,
                total: response.data.total,
                page,
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки объявлений')
            }

            return rejectWithValue('Ошибка загрузки объявлений')
        }
    }
)
