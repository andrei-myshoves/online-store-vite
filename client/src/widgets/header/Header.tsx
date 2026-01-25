import { Link } from '@tanstack/react-router'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { MobileLogoIcon } from '@/shared/ui/icons/MobileLogoIcon'
import styles from './Header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.mobileLogo}>
                    <MobileLogoIcon />
                </div>

                <Input className={styles.search} placeholder="Поиск" />

                <Link to="/" className={styles.loginLink}>
                    <Button type="button" variant="outline" className={styles.loginButton}>
                        Вход в личный кабинет
                    </Button>
                </Link>
            </div>
        </header>
    )
}
