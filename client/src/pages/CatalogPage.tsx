import { useEffect, useState } from 'react'
import styles from './CatalogPage.module.css'
import { api } from '@/shared/api/api'
import { AdvList } from '@/widgets/adv-list/AdvList'
import type { Advertisement } from '@/entities/advertisement/models/types'

export const CatalogPage = () => {
    const [items, setItems] = useState<Advertisement[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await api.get('/advertisement')
                setItems(data.items)
            } catch {
                setError('Ошибка загрузки объявлений')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    return (
        <div className={styles.page}>
            <AdvList items={items} loading={loading} error={error} />
        </div>
    )
}
