import { useNavigate } from '@tanstack/react-router'

interface CatalogPageSearchOptions {
    page?: number
    search?: string
}

export const useCatalogPageSearch = (defaultOptions: CatalogPageSearchOptions = {}) => {
    const navigate = useNavigate()

    return (newOptions: CatalogPageSearchOptions = {}) => {
        navigate({
            to: '/',
            search: {
                search: '',
                page: 1,
                ...defaultOptions,
                ...newOptions,
            },
        })
    }
}
