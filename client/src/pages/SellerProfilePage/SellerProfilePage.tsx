import { useParams, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { Button } from '@/shared/ui/button'
import styles from './SellerProfilePage.module.css'
import { fetchSellerAdvertisements, fetchSellerProfile } from '@/store/reducers/seller/sellerThunks'
import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import {
    selectSellerProfile,
    selectSellerAdvertisements,
    selectSellerPage,
    selectSellerProfileLoading,
    selectSellerAdvertisementsLoading,
    selectSellerError,
} from '@/store/reducers/selectors/sellerSelectors'
import { Loader } from '@/shared/ui/loader/Loader'

const SellerProfilePage = () => {
    const params = useParams({ from: '/seller/$id' })
    const id = params?.id ?? '1'
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectSellerProfile)
    const advertisements = useAppSelector(selectSellerAdvertisements)
    const page = useAppSelector(selectSellerPage)
    const isProfileLoading = useAppSelector(selectSellerProfileLoading)
    const isAdvertisementsLoading = useAppSelector(selectSellerAdvertisementsLoading)
    const error = useAppSelector(selectSellerError)

    useEffect(() => {
        dispatch(fetchSellerProfile(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(fetchSellerAdvertisements({ sellerId: id, page }))
    }, [dispatch, id, page])

    const isPageLoading = isProfileLoading || isAdvertisementsLoading
    if (isPageLoading) {
        return (
            <div className={styles.pageLoader}>
                <Loader />
            </div>
        )
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    if (!profile) {
        return <div className={styles.error}>Продавец не найден</div>
    }

    return (
        <div className={styles.page}>
            <div className={styles.desktopTopBar}>
                <AdvertisementTopBar />
            </div>

            <div className={styles.mobileHeader}>
                <Button variant="wrapper" className={styles.backButton} onClick={() => navigate({ to: '/' })}>
                    <LeftArrow width={12} height={20} />
                </Button>

                <div className={styles.mobileHeaderTitle}>Профиль продавца</div>
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>Профиль продавца</h1>

                <div className={styles.profileBlock}>
                    <div className={styles.avatar} />

                    <div className={styles.profileInfo}>
                        <div className={styles.name}>{profile.username}</div>
                        <div className={styles.city}>{profile.city}</div>
                        <div className={styles.meta}>Продаёт товары с августа 2021</div>
                    </div>

                    <Button className={styles.phoneButton}>Показать телефон</Button>
                </div>
                <h2 className={styles.productsTitle}>Товары продавца</h2>

                <div className={styles.productsGrid}>
                    {isAdvertisementsLoading ? (
                        <div className={styles.loaderWrapper}>
                            <Loader />
                        </div>
                    ) : advertisements.length > 0 ? (
                        advertisements.map(item => <AdvertisementCard key={item.id} item={item} />)
                    ) : (
                        <div className={styles.empty}>У продавца пока нет товаров</div>
                    )}{' '}
                </div>
            </div>
        </div>
    )
}

export default SellerProfilePage
