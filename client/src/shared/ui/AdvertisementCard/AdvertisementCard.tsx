import styles from './AdvertisementCard.module.css'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { Link } from '@tanstack/react-router'

interface Props {
    item: Advertisement
}

export const AdvertisementCard = ({ item }: Props) => {
    const imageSrc = item.images?.[0] || '/placeholder.png'

    return (
        <Link to="/advertisement/$id" params={{ id: item.id.toString() }} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={imageSrc} alt={item.name} loading="lazy" />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>

                <div className={styles.price}>{item.price.toLocaleString()} ₽</div>

                <div className={styles.metaGroup}>
                    <div className={styles.meta}>Санкт-Петербург</div>
                    <div className={styles.meta}>Сегодня</div>
                </div>
            </div>
        </Link>
    )
}
