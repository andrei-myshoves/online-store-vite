import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import styles from './ReviewsBlock.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectReviewsViewModel } from '@/store/reducers/selectors/reviewsSelectors'
import { fetchReviews, createReview } from '@/store/reducers/reviews/reviewsThunks'
import { setPage, resetReviews } from '@/store/reducers/reviews/reviewsSlice'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import { ReviewForm } from './ReviewForm/ReviewForm'

type Props = {
    id: number
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

    const { t } = useTranslation('reviews')

    useEffect(() => {
        dispatch(resetReviews())
        dispatch(setPage(1))
        dispatch(fetchReviews({ advertisementId: id, page: 1, limit: PAGE_LIMIT }))
    }, [dispatch, id])

    const handleBack = () => {
        if (onClose) {
            onClose()
        } else {
            navigate({
                to: '/advertisement/$id',
                params: { id: id.toString() },
            })
        }
    }

    const handleLoadMore = () => {
        const nextPage = page + 1
        dispatch(setPage(nextPage))
        dispatch(fetchReviews({ advertisementId: id, page: nextPage, limit: PAGE_LIMIT }))
    }

    const handleSubmit = async (text: string) => {
        await dispatch(
            createReview({
                advertisementId: id,
                text,
            })
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerTop}>
                <Button variant="wrapper" className={styles.backButton} onClick={handleBack}>
                    <LeftArrow width={12} height={20} />
                </Button>

                <h2 className={styles.title}>
                    {t('reviewsTitle', {
                        count: total,
                    })}
                </h2>
                {onClose && (
                    <Button variant="wrapper" className={styles.closeButton} onClick={onClose}>
                        <CloseIcon width={24} height={24} />
                    </Button>
                )}
            </div>

            <ReviewForm loading={createLoading} error={createError} onSubmit={handleSubmit} />

            {items.length === 0 && !isLoading && <div className={styles.empty}>{t('noReviews')}</div>}

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

                        <div className={styles.commentLabel}>{t('comment')}</div>
                        <div className={styles.text}>{review.text}</div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <Button className={styles.loadMore} onClick={handleLoadMore} disabled={isLoading}>
                    {isLoading ? t('loading') : t('showMore')}
                </Button>
            )}
        </div>
    )
}
