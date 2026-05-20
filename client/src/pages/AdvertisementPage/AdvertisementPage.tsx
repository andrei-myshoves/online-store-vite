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
import { selectCurrentUser } from '@/store/reducers/selectors/authSelectors'
import { useTranslation } from 'react-i18next'

const mockImages = [
    'https://picsum.photos/800/800?1',
    'https://picsum.photos/800/800?2',
    'https://picsum.photos/800/800?3',
    'https://picsum.photos/800/800?4',
    'https://picsum.photos/800/800?5',
]

const AdvertisementPage = () => {
    const params = useParams({ from: '/advertisement/$id' })
    const id = params?.id ?? '1'
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useAppSelector(selectAdvertisementData)
    const currentUser = useAppSelector(selectCurrentUser)

    const [imgSliderIndex, setImgSliderIndex] = useState(0)
    const [isReviewsOpen, setIsReviewsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const { t } = useTranslation('advertisement')

    useEffect(() => {
        dispatch(fetchAdvertisementById(id))
    }, [dispatch, id])

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

        const result = await dispatch(unpublishAdvertisementThunk(data.id))

        if (unpublishAdvertisementThunk.fulfilled.match(result)) {
            dispatch(fetchAdvertisementById(id))
        }
    }

    if (isLoading) {
        return <div className={styles.loader}>{t('loading')}</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    if (!data) {
        return <div className={styles.error}>{t('notFound')}</div>
    }

    const isOwner = Number(currentUser?.id) === Number(data.userId)
    const images = mockImages

    return (
        <div className={styles.page}>
            <AdvertisementTopBar showBackButton />

            <div className={styles.top}>
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <img src={images[imgSliderIndex]} alt={data.name} />
                    </div>

                    {images.length > 1 && (
                        <div className={styles.thumbnails}>
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    className={clsx(styles.thumb, index === imgSliderIndex && styles.active)}
                                    onClick={() => setImgSliderIndex(index)}
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
                        <span>{t('todayAt')}</span>
                        <span>{t('city')}</span>

                        <Button
                            variant="wrapper"
                            className={clsx(styles.reviewsButton, styles.mobileOnly)}
                            onClick={handleNavigateToReviews}
                        >
                            {t('reviewsTitle', { count: data.reviewsCount })}
                        </Button>

                        <Button
                            variant="wrapper"
                            className={clsx(styles.reviewsButton, styles.desktopOnly)}
                            onClick={handleOpenModal}
                        >
                            {t('reviewsTitle', { count: data.reviewsCount })}
                        </Button>
                    </div>

                    <div className={styles.price}>
                        {data.price.toLocaleString()} {t('priceCurrency')}
                    </div>

                    {isOwner ? (
                        <div className={styles.ownerActions}>
                            <Button className={styles.editButton} variant="primary" onClick={() => setIsEditOpen(true)}>
                                {t('edit')}
                            </Button>
                            <Button className={styles.unpublishButton} variant="primary" onClick={handleUnpublish}>
                                {t('unpublish')}
                            </Button>
                        </div>
                    ) : (
                        <Button className={styles.phoneButton}>{t('showPhone')}</Button>
                    )}

                    <div className={styles.seller}>
                        <div className={styles.avatar} />
                        <div>
                            <Button variant="wrapper" className={styles.sellerButton} onClick={handleNavigateToSeller}>
                                <div className={styles.sellerName}>{t('sellerName')}</div>
                            </Button>

                            <div className={styles.sellerMeta}>{t('sellerSince')}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionBlock}>
                <h2 className={styles.descriptionTitle}>{t('description')}</h2>

                <p className={styles.description}>{data.description || t('emptyDescription')}</p>
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
