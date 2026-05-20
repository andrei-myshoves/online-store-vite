import styles from './CatalogPage.module.css'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { Pagination } from '@/widgets/pagination/Pagination'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchCatalog } from '@/store/reducers/catalog/catalogThunks'
import { selectCatalogData } from '@/store/reducers/selectors/catalogSelectors'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { searchAdvertisements } from '@/store/reducers/search/searchThunks'
import { useSearch } from '@tanstack/react-router'
import { useCatalogPageSearch } from '@/hooks/useCatalogPageSearch'
import { useTranslation } from 'react-i18next'

const LIMIT = 10

const CatalogPage = () => {
    const dispatch = useAppDispatch()
    const navigateCatalog = useCatalogPageSearch()

    const { t } = useTranslation('advertisement')

    const { items, total, isLoading, error } = useAppSelector(selectCatalogData)
    const { search, page } = useSearch({ from: '/' })

    useEffect(() => {
        if (search) {
            dispatch(
                searchAdvertisements({
                    query: search,
                    limit: LIMIT,
                    offset: (page - 1) * LIMIT,
                })
            )
        } else {
            dispatch(fetchCatalog({ page, limit: LIMIT }))
        }
    }, [search, page, dispatch])

    const handlePageChange = (p: number) => {
        navigateCatalog({ page: p })
    }

    const handleSearchChange = (value: string) => {
        navigateCatalog({
            search: value,
            page: 1,
        })
    }

    return (
        <div className={styles.page}>
            <AdvertisementTopBar
                showBackButton={false}
                showSearch
                searchValue={search}
                onSearchChange={handleSearchChange}
            />
            <h1 className={styles.title}>{t('title')}</h1>
            <AdvertisementsList items={items} loading={isLoading} error={error} />
            <Pagination page={page} limit={LIMIT} total={total} onChange={handlePageChange} />
        </div>
    )
}

export default CatalogPage
