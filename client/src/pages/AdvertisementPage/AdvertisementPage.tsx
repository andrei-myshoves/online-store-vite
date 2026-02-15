import { useParams } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { api } from '@/shared/api/api'
import { Button } from '@/shared/ui/button'
import styles from './AdvertisementPage.module.css'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import clsx from 'clsx'

const mockImages = [
    'https://picsum.photos/800/800?1',
    'https://picsum.photos/800/800?2',
    'https://picsum.photos/800/800?3',
    'https://picsum.photos/800/800?4',
    'https://picsum.photos/800/800?5',
]

const formatReviewsCount = (count = 0) => {
    if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} отзыв`
    }

    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return `${count} отзыва`
    }

    return `${count} отзывов`
}

export const AdvertisementPage = () => {
    const { id } = useParams({ from: '/advertisement/$id' })

    const [data, setData] = useState<Advertisement | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const reviewsRef = useRef<HTMLDivElement | null>(null)

    const handleScrollToReviews = () => {
        reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

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
    useEffect(() => {
        setActiveIndex(0)
    }, [id])

    if (loading) {
        return <div className={styles.loader}>Загрузка...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    if (!data) {
        return <div className={styles.error}>Объявление не найдено</div>
    }

    const images = data.images && data.images.length > 0 ? data.images : mockImages

    return (
        <div className={styles.page}>
            <AdvertisementTopBar />
            <div className={styles.top}>
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <img src={images[activeIndex]} alt={data.name} />
                    </div>

                    {images.length > 1 && (
                        <div className={styles.thumbnails}>
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    className={clsx(styles.thumb, index === activeIndex && styles.active)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <img src={img} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{data.name}</h1>

                    <div className={styles.meta}>
                        <span>Сегодня в 10:45</span>
                        <span>Санкт-Петербург</span>
                        <Button variant="wrapper" className={styles.reviewsButton} onClick={handleScrollToReviews}>
                            {formatReviewsCount(data.reviewsCount)}
                        </Button>
                    </div>

                    <div className={styles.price}>{data.price.toLocaleString()} ₽</div>

                    <Button className={styles.phoneButton}>Показать телефон</Button>

                    <div className={styles.seller}>
                        <div className={styles.avatar} />
                        <div>
                            <div className={styles.sellerName}>Кирилл</div>
                            <div className={styles.sellerMeta}>Продаёт товары с августа 2021</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionBlock}>
                <h2 className={styles.descriptionTitle}>Описание товара</h2>
                <p className={styles.description}>{data.description || 'Описание отсутствует'}</p>
            </div>
        </div>
    )
}
