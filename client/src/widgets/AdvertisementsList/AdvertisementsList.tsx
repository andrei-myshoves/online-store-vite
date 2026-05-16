import styles from './AdvertisementsList.module.css'
import { AdvertisementCard } from '@/shared/ui/AdvertisementCard/AdvertisementCard'
import type { Advertisement } from '@/entities/advertisement/models/types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

type Props = {
    title?: string
    items: Advertisement[]
    loading: boolean
    error?: string | null
    className?: string
    gridClassName?: string
}

export const AdvertisementsList = ({ title, items, loading, error, className, gridClassName }: Props) => {
    const { t } = useTranslation('advertisement')

    return (
        <section className={clsx(styles.wrapper, className)}>
            {title && <h3 className={styles.title}>{title}</h3>}

            {loading && <div className={styles.state}>{t('loading')}</div>}

            {error && <div className={styles.state}>{error}</div>}

            {!loading && !error && items.length === 0 && <div className={styles.state}>{t('nothingFound')}</div>}

            {!loading && !error && items.length > 0 && (
                <div className={clsx(styles.grid, gridClassName)}>
                    {items.map(item => (
                        <AdvertisementCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}
