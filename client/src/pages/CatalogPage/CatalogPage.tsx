import styles from './CatalogPage.module.css'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { Pagination } from '@/widgets/pagination/Pagination'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchCatalog } from '@/store/reducers/catalog/catalogThunks'
import { setPage } from '@/store/reducers/catalog/catalogSlice'
import { selectCatalogData } from '@/store/reducers/selectors/catalogSelectors'

import { useDeferredValue } from 'react'
import { selectSearchQuery } from '@/store/reducers/selectors/searchSelectors'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'

const LIMIT = 10

const CatalogPage = () => {
    const dispatch = useAppDispatch()

    const { items, page, total, isLoading, error } = useAppSelector(selectCatalogData)
    const query = useAppSelector(selectSearchQuery)

    const deferredQuery = useDeferredValue(query)

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(
                fetchCatalog({
                    page,
                    limit: LIMIT,
                    q: deferredQuery.trim(),
                })
            )
        }, 400)

        return () => clearTimeout(timeout)
    }, [dispatch, page, deferredQuery])

    useEffect(() => {
        if (!query.trim()) {
            dispatch(
                fetchCatalog({
                    page,
                    limit: LIMIT,
                })
            )
        }
    }, [query, dispatch, page])

    return (
        <div className={styles.page}>
            <AdvertisementTopBar showBackButton={false} showSearch />

            <AdvertisementsList items={items} loading={isLoading} error={error} />

            <Pagination page={page} limit={LIMIT} total={total} onChange={p => dispatch(setPage(p))} />
        </div>
    )
}

export default CatalogPage
