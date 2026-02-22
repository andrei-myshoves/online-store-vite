import { useEffect, useState } from 'react'
import { api } from '@/shared/api/api'
import { Button } from '@/shared/ui/button'
import styles from './ReviewsBlock.module.css'
import type { Review } from '@/entities/advertisement/models/types'

type Props = {
    id: number
    initialCount?: number
}

const PAGE_LIMIT = 5

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export const ReviewsBlock = ({ id, initialCount = 0 }: Props) => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(initialCount)
    const [loading, setLoading] = useState(false)

    const loadReviews = async (pageToLoad: number) => {
        try {
            setLoading(true)

            const res = await api.get(`/reviews/comment/${id}`, {
                params: {
                    page: pageToLoad,
                    limit: PAGE_LIMIT,
                },
            })

            if (pageToLoad === 1) {
                setReviews(res.data.items)
            } else {
                setReviews(prev => [...prev, ...res.data.items])
            }

            setTotal(res.data.total)
        } catch (e) {
            console.error('Ошибка загрузки отзывов', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPage(1)
        loadReviews(1)
    }, [id])

    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        loadReviews(nextPage)
    }

    const hasMore = reviews.length < total

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Отзывы о товаре ({total})</h2>

            {reviews.length === 0 && !loading && <div className={styles.empty}>Пока нет отзывов</div>}

            <div className={styles.list}>
                {reviews.map(review => (
                    <div key={review.id} className={styles.review}>
                        <div className={styles.header}>
                            <div className={styles.avatar}>
                                {review.user?.avatar ? (
                                    <img src={review.user.avatar} alt={review.user.username} />
                                ) : (
                                    <div className={styles.placeholder}>{review.user?.username?.[0] || '?'}</div>
                                )}
                            </div>

                            <div>
                                <div className={styles.username}>{review.user?.username}</div>
                                <div className={styles.date}>{formatDate(review.createdAt)}</div>
                            </div>
                        </div>

                        <div className={styles.text}>{review.text}</div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <Button className={styles.loadMore} onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Загрузка...' : 'Показать ещё'}
                </Button>
            )}
        </div>
    )
}
