import { useNavigate } from '@tanstack/react-router'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import { Button } from '@/shared/ui/button'
import styles from './AdvertisementTopBar.module.css'

export const AdvertisementTopBar = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate({ to: '/' })
    }

    return (
        <div className={styles.wrapper}>
            <BrandIcon width={55} height={38} />

            <Button onClick={handleBack} className={styles.backButton}>
                Вернуться на главную
            </Button>
        </div>
    )
}
