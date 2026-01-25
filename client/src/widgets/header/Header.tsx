import { Link } from '@tanstack/react-router'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import styles from './Header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.mobileLogo}>
                <div className={styles.mobileLogoWrapper}>
                    <BrandIcon width={20} height={14} />
                </div>
            </div>

            <Input className={styles.search} placeholder="Поиск" />

            <Link to="/" className={styles.loginLink}>
                <Button type="button" variant="outline" className={styles.loginButton}>
                    Вход в личный кабинет
                </Button>
            </Link>
        </header>
    )
}
