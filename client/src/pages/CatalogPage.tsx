import { useEffect, useState } from 'react'
import styles from './CatalogPage.module.css'
import { api } from '@/shared/api/api'
import { AdvList } from '@/widgets/adv-list/AdvList'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { Button } from '@/shared/ui/button'

const LIMIT = 10

export const CatalogPage = () => {
    const [items, setItems] = useState<Advertisement[]>([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const loadAdvertisements = async () => {
        if (loading || !hasMore) return

        try {
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
                <div className={styles.pagination}>
                    <Button onClick={loadAdvertisements} disabled={loading} variant="outline">
                        {loading ? 'Загрузка…' : 'Показать ещё'}
                    </Button>
                </div>
            )}
        </div>
    )
}
