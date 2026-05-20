import { useTranslation } from 'react-i18next'

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

export const Footer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const navigateCatalog = useCatalogPageSearch()
    const user = useAppSelector(selectCurrentUser)

    const { t } = useTranslation('common')
    const handleGoHome = () => {
        navigateCatalog()
    }
    const handleAddClick = () => {
        dispatch(openModal())
    }

    const handleProfileClick = () => {
        if (!user) {
            dispatch(openAuthModal())
            return
        }

        navigate({ to: '/profile' })
    }

    return (
        <footer className={styles.footer}>
            <Button variant="wrapper" aria-label={t('home')} onClick={handleGoHome}>
                <HomeIcon width={30} height={25} />
            </Button>

            <Button variant="wrapper" aria-label={t('add')} onClick={handleAddClick}>
                <PlusIcon width={42} height={42} />
            </Button>

            <Button variant="wrapper" aria-label={t('profile')} onClick={handleProfileClick}>
                <UserIcon width={27} height={27} />
            </Button>
        </footer>
    )
}
