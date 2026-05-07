import styles from './Footer.module.css'
import { Button } from '@/shared/ui/button'

import { HomeIcon } from '@/shared/ui/icons/HomeIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { UserIcon } from '@/shared/ui/icons/UserIcon'

import { useNavigate } from '@tanstack/react-router'
import { useAppDispatch } from '@/hooks/redux'
import { openModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'

export const Footer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleAddClick = () => {
        dispatch(openModal())
    }

    return (
        <footer className={styles.footer}>
            <Button
                variant="wrapper"
                aria-label="Главная"
                onClick={() =>
                    navigate({
                        to: '/',
                        search: {
                            search: '',
                            page: 1,
                        },
                    })
                }
            >
                <HomeIcon width={30} height={25} />
            </Button>

            <Button variant="wrapper" aria-label="Добавить" onClick={handleAddClick}>
                <PlusIcon width={42} height={42} />
            </Button>

            <Button variant="wrapper" aria-label="Профиль" onClick={() => navigate({ to: '/profile' })}>
                <UserIcon width={27} height={27} />
            </Button>
        </footer>
    )
}
