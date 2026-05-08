import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import styles from './Header.module.css'
import { useMatchRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, lazy, Suspense } from 'react'
import { Loader } from '@/shared/ui/loader/Loader'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { openModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { selectCreateAdIsModalOpen } from '@/store/reducers/selectors/createAdvertisementSelectors'
import { useCatalogPageSearch } from '@/hooks/useCatalogPageSearch'

const AuthModal = lazy(() => import('@/widgets/auth/AuthModal'))
const CreateAdvertisementModal = lazy(
    () => import('@/widgets/CreateAdvertisement/CreateAdvertisementModal/CreateAdvertisementModal')
)

export const Header = () => {
    const navigate = useNavigate()
    const matchRoute = useMatchRoute()
    const navigateCatalog = useCatalogPageSearch()

    const dispatch = useAppDispatch()
    const isCreateAdOpen = useAppSelector(selectCreateAdIsModalOpen)

    const [isAuthOpen, setIsAuthOpen] = useState(false)

    const isCatalogPage = matchRoute({ to: '/' })
    const isAdvertisementPage = matchRoute({ to: '/advertisement/$id' })

    const searchParams = useSearch({ from: '/' }) as { search?: string }
    const query = searchParams.search || ''
    const handleSearchChange = (value: string) => {
        navigateCatalog({ search: value, page: 1 })
    }

    const handleOpenCreateAdvertisementModal = () => {
        dispatch(openModal())
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.mobileBlock}>
                    <div className={styles.mobileLogo}>
                        <div className={styles.mobileLogoWrapper}>
                            <BrandIcon width={20} height={14} />
                        </div>
                    </div>

                    {!isAdvertisementPage && (
                        <Input
                            className={styles.search}
                            placeholder="Поиск"
                            value={query}
                            onChange={e => handleSearchChange(e.target.value)}
                        />
                    )}
                </div>

                <div className={styles.desktopBlock}>
                    {isCatalogPage && (
                        <Button variant="outline" onClick={() => setIsAuthOpen(true)} className={styles.loginButton}>
                            Вход в личный кабинет
                        </Button>
                    )}

                    {!isCatalogPage && (
                        <div className={styles.desktopActions}>
                            <Button
                                variant="outline"
                                onClick={handleOpenCreateAdvertisementModal}
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
                    )}
                </div>
            </header>

            {isAuthOpen && (
                <Suspense fallback={<Loader />}>
                    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
                </Suspense>
            )}

            {isCreateAdOpen && (
                <Suspense fallback={<Loader />}>
                    <CreateAdvertisementModal />
                </Suspense>
            )}
        </>
    )
}
