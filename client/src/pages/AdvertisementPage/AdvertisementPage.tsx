import { useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { ReviewsBlock } from '@/widgets/reviews/ReviewsBlock'
import { Modal } from '@/shared/ui/modal/Modal'
import styles from './AdvertisementPage.module.css'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchAdvertisementById, unpublishAdvertisementThunk } from '@/store/reducers/advertisement/advertisementThunks'
import { selectAdvertisementData } from '@/store/reducers/selectors/advertisementSelectors'
import { EditAdvertisementModal } from '@/widgets/EditAdvertisementModal/EditAdvertisementModal'

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

const AdvertisementPage = () => {
    const params = useParams({ from: '/advertisement/$id' })
    const id = params?.id ?? '1'
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useAppSelector(selectAdvertisementData)
    const currentUser = useAppSelector(state => state.auth.user)

    const [activeIndex, setActiveIndex] = useState(0)
    const [isReviewsOpen, setIsReviewsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const handleOpenModal = () => {
        setIsReviewsOpen(true)
    }

    const handleNavigateToReviews = () => {
        if (!data) return

        navigate({
            to: '/reviews/$id',
            params: { id: data.id.toString() },
        })
    }

    const handleNavigateToSeller = () => {
        if (!data) return

        navigate({
            to: '/seller/$id',
            params: { id: data.userId.toString() },
        })
    }

    const handleUnpublish = async () => {
        if (!data) return
        await dispatch(unpublishAdvertisementThunk(data.id))
        dispatch(fetchAdvertisementById(id))
    }

    useEffect(() => {
        dispatch(fetchAdvertisementById(id))
    }, [dispatch, id])

    useEffect(() => {
        setActiveIndex(0)
    }, [id])

    if (isLoading) {
        return <div className={styles.loader}>Загрузка...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    if (!data) {
        return <div className={styles.error}>Объявление не найдено</div>
    }

    const isOwner = Number(currentUser?.id) === Number(data.userId)
    const images = mockImages

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

                        <Button
                            variant="wrapper"
                            className={clsx(styles.reviewsButton, styles.mobileOnly)}
                            onClick={handleNavigateToReviews}
                        >
                            {formatReviewsCount(data.reviewsCount)}
                        </Button>

                        <Button
                            variant="wrapper"
                            className={clsx(styles.reviewsButton, styles.desktopOnly)}
                            onClick={handleOpenModal}
                        >
                            {formatReviewsCount(data.reviewsCount)}
                        </Button>
                    </div>

                    <div className={styles.price}>{data.price.toLocaleString()} ₽</div>

                    {isOwner ? (
                        <div className={styles.ownerActions}>
                            <Button className={styles.editButton} variant="primary" onClick={() => setIsEditOpen(true)}>
                                Редактировать
                            </Button>
                            <Button className={styles.unpublishButton} variant="primary" onClick={handleUnpublish}>
                                Снять с публикации
                            </Button>{' '}
                        </div>
                    ) : (
                        <Button className={styles.phoneButton}>Показать телефон</Button>
                    )}

                    <div className={styles.seller}>
                        <div className={styles.avatar} />
                        <div>
                            <Button variant="wrapper" className={styles.sellerButton} onClick={handleNavigateToSeller}>
                                <div className={styles.sellerName}>Кирилл</div>
                            </Button>
                            <div className={styles.sellerMeta}>Продаёт товары с августа 2021</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionBlock}>
                <h2 className={styles.descriptionTitle}>Описание товара</h2>
                <p className={styles.description}>{data.description || 'Описание отсутствует'}</p>
            </div>

            {isReviewsOpen && (
                <Modal isOpen={isReviewsOpen} onClose={() => setIsReviewsOpen(false)}>
                    <ReviewsBlock id={data.id} onClose={() => setIsReviewsOpen(false)} />
                </Modal>
            )}

            {isEditOpen && (
                <EditAdvertisementModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} advertisement={data} />
            )}
        </div>
    )
}

export default AdvertisementPage
