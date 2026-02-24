import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import styles from './ReviewsBlock.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectReviewsViewModel } from '@/store/reducers/selectors/reviewsSelectors'
import { fetchReviews, createReview } from '@/store/reducers/reviews/reviewsThunks'
import { setPage, resetReviews } from '@/store/reducers/reviews/reviewsSlice'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'

type Props = {
    id: number
    initialCount?: number
    onClose?: () => void
}

const PAGE_LIMIT = 5

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export const ReviewsBlock = ({ id, onClose }: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { items, page, total, isLoading, createLoading, createError, hasMore } =
        useAppSelector(selectReviewsViewModel)

    const [text, setText] = useState('')

    useEffect(() => {
        dispatch(resetReviews())
        dispatch(fetchReviews({ advertisementId: id, page: 1, limit: PAGE_LIMIT }))
        dispatch(setPage(1))
    }, [dispatch, id])

    const handleLoadMore = () => {
        const nextPage = page + 1
        dispatch(setPage(nextPage))
        dispatch(fetchReviews({ advertisementId: id, page: nextPage, limit: PAGE_LIMIT }))
    }

    const handleSubmit = async () => {
        if (!text.trim()) return

        const result = await dispatch(
            createReview({
                advertisementId: id,
                text,
            })
        )

        if (createReview.fulfilled.match(result)) {
            setText('')
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerTop}>
                <Button
                    variant="wrapper"
                    className={styles.backButton}
                    onClick={() =>
                        navigate({
                            to: '/advertisement/$id',
                            params: { id: id.toString() },
                        })
                    }
                >
                    <LeftArrow width={12} height={20} />
                </Button>

                <h2 className={styles.title}>Отзывы о товаре ({total})</h2>

                <Button variant="wrapper" className={styles.closeButton} onClick={onClose}>
                    <CloseIcon width={30} height={30} />
                </Button>
            </div>
            <div className={styles.form}>
                <div className={styles.formTitle}>Добавить отзыв</div>

                <textarea
                    className={styles.textarea}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Введите отзыв"
                    disabled={createLoading}
                />

                {createError && <div className={styles.error}>{createError}</div>}

                <Button className={styles.formButton} onClick={handleSubmit} disabled={!text.trim() || createLoading}>
                    {createLoading ? 'Публикация...' : 'Опубликовать'}
                </Button>
            </div>
            {items.length === 0 && !isLoading && <div className={styles.empty}>Пока нет отзывов</div>}

            <div className={styles.list}>
                {items.map(review => (
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
                        <div className={styles.commentLabel}>Комментарий</div>
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
