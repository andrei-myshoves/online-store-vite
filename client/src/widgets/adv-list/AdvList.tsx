import styles from './AdvList.module.css'
import type { Advertisement } from '@/entities/advertisement/models/types'

type Props = {
    items: Advertisement[]
    loading: boolean
    error?: string | null
}

export const AdvList = ({ items, loading, error }: Props) => {
    if (loading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (items.length === 0) {
        return <div>Здесь пока нет объявлений</div>
    }

    return (
        <section>
            <h1 className={styles.title}>Объявления</h1>

            <div className={styles.grid}>
                {items.map(item => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.image}>
                            <img src={item.images?.[0] ?? '/placeholder.png'} alt="Фотография товара" />
                        </div>

                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.price}>{item.price} ₽</div>
                    </div>
                ))}
            </div>
        </section>
    )
}
