import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import type { Advertisement } from '@/entities/advertisement/models/types'
import styles from './UserAdvertisements.module.css'

export const UserAdvertisements = () => {
    const advertisements: Advertisement[] = []

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Мои товары</h2>

            {advertisements.length === 0 ? (
                <div className={styles.empty}>У вас пока нет объявлений</div>
            ) : (
                <div className={styles.grid}>
                    {advertisements.map(item => (
                        <AdvertisementCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}
