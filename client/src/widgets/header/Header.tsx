import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import styles from './Header.module.css'
import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { AuthModal } from '@/widgets/auth/AuthModal'
import { useDispatch } from 'react-redux'
import { openModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'

export const Header = () => {
    const navigate = useNavigate()
    const matchRoute = useMatchRoute()
    const dispatch = useDispatch()

    const [isAuthOpen, setIsAuthOpen] = useState(false)

    const isAdvertisementPage = matchRoute({ to: '/advertisement/$id' })

    return (
        <>
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
                    <div className={styles.desktopActions}>
                        <Button
                            variant="outline"
                            onClick={() => dispatch(openModal())}
                            className={styles.desktopAction}
                        >
                            Разместить объявление
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => navigate({ to: '/profile' })}
                            className={styles.desktopAction}
                        >
                            Личный кабинет
                        </Button>
                    </div>
                </div>
            </header>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    )
}
