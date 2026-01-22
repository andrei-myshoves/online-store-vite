import { Outlet } from '@tanstack/react-router'
import styles from './AppLayout.module.css'

export const AppLayout = () => {
    return (
        <div className={styles.root}>
            <main className={styles.container}>
                <Outlet />
            </main>
        </div>
    )
}
