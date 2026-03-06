import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSellerProfile = createAsyncThunk(
    'seller/fetchProfile',
    async (sellerId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/seller/${sellerId}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки профиля')
        }
    }
)

export const fetchSellerAdvertisements = createAsyncThunk(
    'seller/fetchAdvertisements',
    async ({ sellerId, page }: { sellerId: string; page: number }, { rejectWithValue }) => {
        try {
            const limit = 8
            const offset = (page - 1) * limit

            const response = await axios.get(`/api/seller/${sellerId}/advertisements`, {
                params: { limit, offset },
            })

            return {
                items: response.data.items,
                total: response.data.total,
                page,
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки объявлений')
        }
    }
)
