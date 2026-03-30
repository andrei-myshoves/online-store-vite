import { api } from './api'
import type { paths } from '@/shared/api/types/api'

export type CreateAdvertisementDto = paths['/advertisement']['post']['requestBody']['content']['application/json']

export type CreateAdvertisementResponse =
    paths['/advertisement']['post']['responses']['201']['content']['application/json']

export const createAdvertisement = async (data: CreateAdvertisementDto): Promise<CreateAdvertisementResponse> => {
    const response = await api.post('/advertisement', data)
    return response.data
}
