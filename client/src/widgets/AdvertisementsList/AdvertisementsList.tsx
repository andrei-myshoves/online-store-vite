import styles from './AdvertisementsList.module.css'
import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import type { Advertisement } from '@/entities/advertisement/models/types'

type Props = {
    title?: string
    items: Advertisement[]
    loading: boolean
    error?: string | null
    className?: string
    gridClassName?: string
}

export const AdvertisementsList = ({ title, items, loading, error, className, gridClassName }: Props) => {
    return (
        <section className={`${styles.wrapper} ${className || ''}`}>
            {title && <h3 className={styles.title}>{title}</h3>}

            {loading && <div className={styles.state}>Загрузка...</div>}

            {error && <div className={styles.state}>{error}</div>}

            {!loading && !error && items.length === 0 && <div className={styles.state}>Ничего не найдено</div>}

            {!loading && !error && items.length > 0 && (
                <div className={`${styles.grid} ${gridClassName || ''}`}>
                    {items.map(item => (
                        <AdvertisementCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}
