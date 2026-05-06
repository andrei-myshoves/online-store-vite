import styles from './CatalogPage.module.css'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { Pagination } from '@/widgets/pagination/Pagination'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchCatalog } from '@/store/reducers/catalog/catalogThunks'
import { setPage } from '@/store/reducers/catalog/catalogSlice'
import { selectCatalogData } from '@/store/reducers/selectors/catalogSelectors'

import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'

import { selectSearchQuery } from '@/store/reducers/selectors/searchSelectors'
import { searchAdvertisements } from '@/store/reducers/search/searchThunks'
import { setQuery } from '@/store/reducers/search/searchSlice'

import { useDebounce } from '@/hooks/useDebounce'
import { useNavigate, useSearch } from '@tanstack/react-router'

const LIMIT = 10

const CatalogPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { items, page, total, isLoading, error } = useAppSelector(selectCatalogData)
    const query = useAppSelector(selectSearchQuery)

    const debouncedQuery = useDebounce(query)

    const searchParams = useSearch({ from: '/' }) as { search?: string }
    const search = searchParams.search

    useEffect(() => {
        if (search && search !== query) {
            dispatch(setQuery(search))
        }
    }, [search, dispatch])

    useEffect(() => {
        const q = debouncedQuery?.trim()

        if (q) {
            dispatch(
                searchAdvertisements({
                    query: q,
                    limit: LIMIT,
                    offset: (page - 1) * LIMIT,
                })
            )
        } else {
            dispatch(fetchCatalog({ page, limit: LIMIT }))
        }
    }, [debouncedQuery, page, dispatch])

    const handleSearchChange = (value: string) => {
        dispatch(setQuery(value))
        dispatch(setPage(1))

        navigate({
            to: '/',
            search: {
                search: value || undefined,
            },
        })
    }

    return (
        <div className={styles.page}>
            <AdvertisementTopBar showBackButton={false} showSearch onSearchChange={handleSearchChange} />

            <h1 className={styles.title}>Объявления</h1>

            <AdvertisementsList items={items} loading={isLoading} error={error} />

            <Pagination page={page} limit={LIMIT} total={total} onChange={p => dispatch(setPage(p))} />
        </div>
    )
}

export default CatalogPage
