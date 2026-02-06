import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './CatalogPage.module.css'
import { api } from '@/shared/api/api'
import { AdvList } from '@/widgets/adv-list/AdvList'
import type { Advertisement } from '@/entities/advertisement/models/types'

export const CatalogPage = () => {
    const LIMIT = 10

    const [items, setItems] = useState<Advertisement[]>([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const loaderRef = useRef<HTMLDivElement | null>(null)

    const loadAdvertisements = useCallback(async () => {
        if (loading || !hasMore) return

        try {
            setLoading(true)
            const { data } = await api.get('/advertisement', {
                params: { limit: LIMIT, offset },
            })

            setItems(prev => [...prev, ...data.items])
            setOffset(prevOffset => {
                const newOffset = prevOffset + data.items.length
                setHasMore(newOffset < data.total)
                return newOffset
            })
        } catch {
            setError('Ошибка загрузки')
        } finally {
            setLoading(false)
        }
    }, [loading, hasMore, offset])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadAdvertisements()
                }
            },
            { threshold: 0.1 }
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()
    }, [loadAdvertisements, hasMore, loading])

    return (
        <div className={styles.page}>
            <AdvList items={items} loading={loading} error={error} />

            {hasMore && (
                <div ref={loaderRef} style={{ height: '50px', margin: '20px 0' }}>
                    {loading && <p>Загрузка новых объявлений...</p>}
                </div>
            )}
        </div>
    )
}
