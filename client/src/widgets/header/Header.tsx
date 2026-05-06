import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import styles from './Header.module.css'
import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { openModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { lazy, Suspense } from 'react'
import { Loader } from '@/shared/ui/loader/Loader'
import { useAppSelector } from '@/hooks/redux'
import { selectCreateAdIsModalOpen } from '@/store/reducers/selectors/createAdvertisementSelectors'
import { setQuery } from '@/store/reducers/search/searchSlice'
import { selectSearchQuery } from '@/store/reducers/selectors/searchSelectors'
import { setPage } from '@/store/reducers/catalog/catalogSlice'
import { useDebounceFn } from '@/hooks/useDebounceFn'
import { searchAdvertisements } from '@/store/reducers/search/searchThunks'
import { fetchCatalog } from '@/store/reducers/catalog/catalogThunks'

const AuthModal = lazy(() => import('@/widgets/auth/AuthModal'))
const CreateAdvertisementModal = lazy(
    () => import('@/widgets/CreateAdvertisement/CreateAdvertisementModal/CreateAdvertisementModal')
)
export const Header = () => {
    const navigate = useNavigate()
    const matchRoute = useMatchRoute()
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectSearchQuery)
    const isCreateAdOpen = useAppSelector(selectCreateAdIsModalOpen)

    const [isAuthOpen, setIsAuthOpen] = useState(false)

    const isCatalogPage = matchRoute({ to: '/' })
    const isAdvertisementPage = matchRoute({ to: '/advertisement/$id' })

    const handleOpenCreateAdvertisementModal = () => {
        dispatch(openModal())
    }

    const debouncedSearch = useDebounceFn((value: string) => {
        const q = value.trim()

        if (q) {
            dispatch(
                searchAdvertisements({
                    query: q,
                    limit: 10,
                    offset: 0,
                })
            )
        } else {
            dispatch(fetchCatalog({ page: 1, limit: 10 }))
        }
    }, 400)

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
                            onChange={e => {
                                const value = e.target.value

                                dispatch(setQuery(value))
                                dispatch(setPage(1))

                                navigate({
                                    to: '/',
                                    search: {
                                        search: value || undefined,
                                    },
                                })

                                debouncedSearch(value)
                            }}
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
