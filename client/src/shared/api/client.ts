import { api } from './api'
import type { paths } from './types/api'

type Method = 'get' | 'post' | 'patch' | 'delete'

export const request = async <TPath extends keyof paths, TMethod extends keyof paths[TPath]>(
    path: TPath,
    method: TMethod,
    options?: {
        params?: any
        body?: any
    }
) => {
    const res = await api.request({
        url: path as string,
        method: method as Method,
        params: options?.params,
        data: options?.body,
    })

    return res.data
}
