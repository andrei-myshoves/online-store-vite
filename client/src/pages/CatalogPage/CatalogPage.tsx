import styles from './CatalogPage.module.css'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { Pagination } from '@/widgets/pagination/Pagination'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchCatalog } from '@/store/reducers/catalog/catalogThunks'
import { selectCatalogData } from '@/store/reducers/selectors/catalogSelectors'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { searchAdvertisements } from '@/store/reducers/search/searchThunks'
import { useNavigate, useSearch } from '@tanstack/react-router'

const LIMIT = 10

const CatalogPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
        navigate({
            to: '/',
            search: {
                search,
                page: p,
            },
        })
    }

    const handleSearchChange = (value: string) => {
        navigate({
            to: '/',
            search: {
                search: value,
                page: 1,
            },
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

            <h1 className={styles.title}>Объявления</h1>

            <AdvertisementsList items={items} loading={isLoading} error={error} />

            <Pagination page={page} limit={LIMIT} total={total} onChange={handlePageChange} />
        </div>
    )
}

export default CatalogPage
