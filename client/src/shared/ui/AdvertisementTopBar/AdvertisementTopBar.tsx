import { Link } from '@tanstack/react-router'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import { Button } from '@/shared/ui/button'
import styles from './AdvertisementTopBar.module.css'

export const AdvertisementTopBar = () => {
    return (
        <div className={styles.wrapper}>
            <BrandIcon width={55} height={38} />

            <Link to="/">
                <Button className={styles.backButton}>Вернуться на главную</Button>
            </Link>
        </div>
    )
}
