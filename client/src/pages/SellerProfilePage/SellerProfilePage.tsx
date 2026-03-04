import { useParams, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { Button } from '@/shared/ui/button'
import styles from './SellerProfilePage.module.css'
import { fetchSellerAdvertisements } from '@/store/reducers/seller/sellerThunks'
import { fetchSellerProfile } from '@/store/reducers/seller/sellerThunks'
import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'

export const SellerProfilePage = () => {
    const { id } = useParams({ from: '/seller/$id' })
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const { profile, advertisements, page, isLoading, error } = useAppSelector(state => state.seller)

    useEffect(() => {
        dispatch(fetchSellerProfile(id))
        dispatch(fetchSellerAdvertisements({ sellerId: id, page }))
    }, [dispatch, id])

    if (isLoading) {
        return <div className={styles.loader}>Загрузка...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    if (!profile) {
        return <div className={styles.error}>Продавец не найден</div>
    }
    console.log(advertisements)

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
                    {advertisements.map(item => (
                        <AdvertisementCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
