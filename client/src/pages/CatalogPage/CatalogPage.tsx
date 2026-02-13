import { useEffect, useState } from 'react'
import styles from './CatalogPage.module.css'
import { api } from '@/shared/api/api'
import { AdvList } from '@/widgets/adv-list/AdvList'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { Pagination } from '@/widgets/pagination/Pagination'

const LIMIT = 10

export const CatalogPage = () => {
    const [items, setItems] = useState<Advertisement[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadAdvertisements = async () => {
            try {
                setLoading(true)
                setError(null)

                const offset = (page - 1) * LIMIT

                const { data } = await api.get('/advertisement', {
                    params: { limit: LIMIT, offset },
                })

                setItems(data.items)
                setTotal(data.total)
            } catch {
                setError('Ошибка загрузки объявлений')
            } finally {
                setLoading(false)
            }
        }

        loadAdvertisements()
    }, [page])

    return (
        <div className={styles.page}>
            <AdvList items={items} loading={loading} error={error} />

            <Pagination page={page} limit={LIMIT} total={total} onChange={setPage} />
        </div>
    )
}
