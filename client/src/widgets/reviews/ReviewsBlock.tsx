import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchReviews } from '@/store/reducers/reviews/reviewsThunks'
import { setPage, resetReviews } from '@/store/reducers/reviews/reviewsSlice'
import { Button } from '@/shared/ui/button'
import styles from './ReviewsBlock.module.css'
import { selectReviewsData } from '@/store/reducers/selectors/reviewsSelectors'

type Props = {
    id: number
    initialCount?: number
}

const PAGE_LIMIT = 5

export const ReviewsBlock = ({ id }: Props) => {
    const dispatch = useAppDispatch()
    const { items, page, total, isLoading } = useAppSelector(selectReviewsData)

    useEffect(() => {
        dispatch(resetReviews())
        dispatch(fetchReviews({ advertisementId: id, page: 1, limit: PAGE_LIMIT }))
    }, [dispatch, id])

    const handleLoadMore = () => {
        const nextPage = page + 1
        dispatch(setPage(nextPage))
        dispatch(fetchReviews({ advertisementId: id, page: nextPage, limit: PAGE_LIMIT }))
    }

    const hasMore = items.length < total

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Отзывы о товаре ({total})</h2>

            {items.length === 0 && !isLoading && <div className={styles.empty}>Пока нет отзывов</div>}

            <div className={styles.list}>
                {items.map(review => (
                    <div key={review.id} className={styles.review}>
                        <div className={styles.header}>
                            <div className={styles.avatar}>
                                {review.user?.avatar ? (
                                    <img src={review.user.avatar} />
                                ) : (
                                    <div className={styles.placeholder}>{review.user?.username?.[0] || '?'}</div>
                                )}
                            </div>

                            <div>
                                <div className={styles.username}>{review.user?.username}</div>
                                <div className={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className={styles.text}>{review.text}</div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <Button className={styles.loadMore} onClick={handleLoadMore} disabled={isLoading}>
                    {isLoading ? 'Загрузка...' : 'Показать ещё'}
                </Button>
            )}
        </div>
    )
}
