import styles from './AdvList.module.css'
import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import type { Advertisement } from '@/entities/advertisement/models/types'

type Props = {
    title?: string
    items: Advertisement[]
    loading: boolean
    error?: string | null
}

export const AdvList = ({ title, items, loading, error }: Props) => {
    if (loading && items.length === 0) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!items.length) {
        return (
            <section className={styles.wrapper}>
                {title && <h3 className={styles.title}>{title}</h3>}
                <div className={styles.empty}>Ничего не найдено</div>
            </section>
        )
    }

    return (
        <section className={styles.wrapper}>
            {title && <h3 className={styles.title}>{title}</h3>}

            <div className={styles.grid}>
                {items.map(item => (
                    <AdvertisementCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}
