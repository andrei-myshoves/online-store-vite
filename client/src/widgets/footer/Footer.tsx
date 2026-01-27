import styles from './Footer.module.css'
import { Button } from '@/shared/ui/button'

import { HomeIcon } from '@/shared/ui/icons/HomeIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { UserIcon } from '@/shared/ui/icons/UserIcon'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Button variant="wrapper" aria-label="Главная">
                <HomeIcon width={30} height={25} />
            </Button>

            <Button variant="wrapper" aria-label="Добавить">
                <PlusIcon width={42} height={42} />
            </Button>

            <Button variant="wrapper" aria-label="Профиль">
                <UserIcon width={27} height={27} />
            </Button>
        </footer>
    )
}
