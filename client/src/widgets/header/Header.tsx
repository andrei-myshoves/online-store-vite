import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import styles from './Header.module.css'
import { useMatchRoute, useNavigate } from '@tanstack/react-router'

export const Header = () => {
    const navigate = useNavigate()
    const matchRoute = useMatchRoute()

    const isAdvertisementPage = matchRoute({ to: '/advertisement/$id' })

    return (
        <header className={styles.header}>
            <div className={styles.mobileBlock}>
                <div className={styles.mobileLogo}>
                    <div className={styles.mobileLogoWrapper}>
                        <BrandIcon width={20} height={14} />
                    </div>
                </div>

                {!isAdvertisementPage && <Input className={styles.search} placeholder="Поиск" />}
            </div>

            <div className={styles.desktopBlock}>
                {!isAdvertisementPage && (
                    <Button variant="outline" onClick={() => navigate({ to: '/' })} className={styles.loginButton}>
                        Вход в личный кабинет
                    </Button>
                )}

                {isAdvertisementPage && (
                    <div className={styles.desktopActions}>
                        <Button
                            variant="outline"
                            onClick={() => navigate({ to: '/' })}
                            className={styles.desktopAction}
                        >
                            Разместить объявление
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => navigate({ to: '/' })}
                            className={styles.desktopAction}
                        >
                            Личный кабинет
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}
