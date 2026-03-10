import styles from './CatalogPage.module.css'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { Pagination } from '@/widgets/pagination/Pagination'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchCatalog } from '@/store/reducers/catalog/catalogThunks'
import { setPage } from '@/store/reducers/catalog/catalogSlice'
import { selectCatalogData } from '@/store/reducers/selectors/catalogSelectors'

const LIMIT = 10

export const CatalogPage = () => {
    const dispatch = useAppDispatch()
    const { items, page, total, isLoading, error } = useAppSelector(selectCatalogData)

    useEffect(() => {
        dispatch(fetchCatalog({ page, limit: LIMIT }))
    }, [dispatch, page])

    return (
        <div className={styles.page}>
            <AdvertisementsList items={items} loading={isLoading} error={error} />

            <Pagination page={page} limit={LIMIT} total={total} onChange={p => dispatch(setPage(p))} />
        </div>
    )
}
