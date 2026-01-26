import styles from './Footer.module.css'
import { Button } from '@/shared/ui/button'
import clsx from 'clsx'

import { HomeIcon } from '@/shared/ui/icons/HomeIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { UserIcon } from '@/shared/ui/icons/UserIcon'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Button variant="wrapper" className={clsx(styles.footerButton, styles.default)} aria-label="Главная">
                <HomeIcon />
            </Button>

            <Button variant="wrapper" className={clsx(styles.footerButton, styles.plus)} aria-label="Добавить">
                <PlusIcon />
            </Button>

            <Button variant="wrapper" className={clsx(styles.footerButton, styles.default)} aria-label="Профиль">
                <UserIcon />
            </Button>
        </footer>
    )
}
