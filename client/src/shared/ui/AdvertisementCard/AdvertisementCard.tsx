import styles from './AdvertisementCard.module.css'
import type { Advertisement } from '@/entities/advertisement/models/types'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

interface Props {
    item: Advertisement
}

export const AdvertisementCard = ({ item }: Props) => {
    const imageSrc = item.images?.[0] || '/placeholder.png'
    const { t } = useTranslation('advertisement')

    return (
        <Link to="/advertisement/$id" params={{ id: item.id.toString() }} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={imageSrc} alt={item.name} loading="lazy" />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>

                <div className={styles.price}>
                    {item.price.toLocaleString()} {t('priceCurrency')}
                </div>

                <div className={styles.metaGroup}>
                    <div className={styles.meta}>{t('city')}</div>
                    <div className={styles.meta}>{t('today')}</div>
                </div>
            </div>
        </Link>
    )
}
