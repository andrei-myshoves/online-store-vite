import { Link, useMatchRoute } from '@tanstack/react-router'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import styles from './Header.module.css'
import { useEffect, useState } from 'react'

export const Header = () => {
    const matchRoute = useMatchRoute()

    const isAdvertisementPage = matchRoute({ to: '/advertisement/$id' })

    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1248px)')
        const listener = () => setIsDesktop(media.matches)

        listener()
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }, [])

    return (
        <header className={styles.header}>
            {(!isDesktop || isAdvertisementPage) && (
                <div className={styles.mobileLogo}>
                    <div className={styles.mobileLogoWrapper}>
                        <BrandIcon width={20} height={14} />
                    </div>
                </div>
            )}

            {!isDesktop && !isAdvertisementPage && <Input className={styles.search} placeholder="Поиск" />}

            {isDesktop && !isAdvertisementPage && (
                <Link to="/" className={styles.loginLink}>
                    <Button variant="outline" className={styles.loginButton}>
                        Вход в личный кабинет
                    </Button>
                </Link>
            )}

            {isDesktop && isAdvertisementPage && (
                <div className={styles.desktopActions}>
                    <Link to="/">
                        <Button variant="outline" className={styles.desktopAction}>
                            Разместить объявление
                        </Button>
                    </Link>

                    <Link to="/">
                        <Button variant="outline" className={styles.desktopAction}>
                            Личный кабинет
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    )
}
