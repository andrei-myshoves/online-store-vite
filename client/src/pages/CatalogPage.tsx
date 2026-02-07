import { useEffect, useRef, useState } from 'react'
import styles from './CatalogPage.module.css'
import { api } from '@/shared/api/api'
import { AdvList } from '@/widgets/adv-list/AdvList'
import type { Advertisement } from '@/entities/advertisement/models/types'

const LIMIT = 10

export const CatalogPage = () => {
    const [items, setItems] = useState<Advertisement[]>([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const loadingRef = useRef(false)

    const loadAdvertisements = async () => {
        if (loadingRef.current || !hasMore) return

        try {
            loadingRef.current = true
            setLoading(true)
            setError(null)

            const { data } = await api.get('/advertisement', {
                params: { limit: LIMIT, offset },
            })

            setItems(prev => {
                const existingIds = new Set(prev.map(item => item.id))
                const uniqueNewItems = data.items.filter((item: Advertisement) => !existingIds.has(item.id))

                return [...prev, ...uniqueNewItems]
            })

            setOffset(prevOffset => {
                const newOffset = prevOffset + data.items.length
                setHasMore(newOffset < data.total)
                return newOffset
            })
        } catch {
            setError('Ошибка загрузки объявлений')
        } finally {
            loadingRef.current = false
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAdvertisements()
    }, [])

    return (
        <div className={styles.page}>
            <AdvList items={items} loading={loading} error={error} />

            {hasMore && (
                <button className={styles.loadMore} onClick={loadAdvertisements} disabled={loading}>
                    {loading ? 'Загрузка…' : 'Показать ещё'}
                </button>
            )}
        </div>
    )
}
