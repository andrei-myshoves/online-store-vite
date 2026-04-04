import { api } from './api'
import type { paths } from '@/shared/api/types/api'

type SwaggerDto = paths['/advertisement']['post']['requestBody']['content']['multipart/form-data']

export type CreateAdvertisementDto = Omit<SwaggerDto, 'images'> & {
    images: File[]
}

export type CreateAdvertisementResponse =
    paths['/advertisement']['post']['responses']['201']['content']['application/json']

export const createAdvertisement = async (data: CreateAdvertisementDto): Promise<CreateAdvertisementResponse> => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', String(data.price))
    formData.append('city', data.city)

    data.images.forEach(file => {
        formData.append('images', file)
    })

    const response = await api.post('/advertisement', formData)

    return response.data
}
