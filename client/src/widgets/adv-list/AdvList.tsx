import styles from './AdvList.module.css'
import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import type { Advertisement } from '@/entities/advertisement/models/types'

type Props = {
    items: Advertisement[]
    loading: boolean
    error?: string | null
}

export const AdvList = ({ items, loading, error }: Props) => {
    if (loading && items.length === 0) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!items.length) {
        return <div>Ничего не найдено</div>
    }

    return (
        <section className={styles.grid}>
            {items.map(item => (
                <AdvertisementCard key={item.id} item={item} />
            ))}
        </section>
    )
}
