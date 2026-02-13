import { useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '@/shared/api/api'
import { Button } from '@/shared/ui/button'
import styles from './AdvertisementPage.module.css'
import type { Advertisement } from '@/entities/advertisement/models/types'

export const AdvertisementPage = () => {
    const { id } = useParams({ from: '/advertisement/$id' })

    const [data, setData] = useState<Advertisement | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/advertisement/${id}`)
                setData(res.data)
            } catch {
                setError('Объявление не найдено')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [id])

    if (loading) return <div className={styles.loader}>Загрузка...</div>
    if (error || !data) return <div className={styles.error}>{error}</div>

    return (
        <div className={styles.page}>
            <div className={styles.gallery}>
                {data.images?.[0] ? <img src={data.images[0]} alt={data.name} /> : null}
            </div>

            <div className={styles.info}>
                <h1 className={styles.title}>{data.name}</h1>

                <div className={styles.price}>{data.price.toLocaleString()} ₽</div>

                <Button>Показать телефон</Button>

                <div className={styles.description}>{data.description}</div>
            </div>
        </div>
    )
}
