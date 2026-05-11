import styles from './Footer.module.css'
import { Button } from '@/shared/ui/button'

import { HomeIcon } from '@/shared/ui/icons/HomeIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { UserIcon } from '@/shared/ui/icons/UserIcon'

import { useNavigate } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { openModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { useCatalogPageSearch } from '@/hooks/useCatalogPageSearch'
import { selectCurrentUser } from '@/store/reducers/selectors/authSelectors'
import { openAuthModal } from '@/store/reducers/auth/authSlice'
import { useStore } from 'react-redux'

export const Footer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const navigateCatalog = useCatalogPageSearch()
    const user = useAppSelector(selectCurrentUser)

    const handleGoHome = () => {
        navigateCatalog()
    }
    const handleAddClick = () => {
        dispatch(openModal())
    }

    const handleProfileClick = () => {
        console.log('CLICK')
        if (!user) {
            dispatch(openAuthModal())
            return
        }

        navigate({ to: '/profile' })
    }
    const store = useStore()
    console.log('FOOTER STORE', store)

    return (
        <footer className={styles.footer}>
            <Button variant="wrapper" aria-label="Главная" onClick={handleGoHome}>
                <HomeIcon width={30} height={25} />
            </Button>

            <Button variant="wrapper" aria-label="Добавить" onClick={handleAddClick}>
                <PlusIcon width={42} height={42} />
            </Button>

            <Button variant="wrapper" aria-label="Профиль" onClick={handleProfileClick}>
                <UserIcon width={27} height={27} />
            </Button>
        </footer>
    )
}
