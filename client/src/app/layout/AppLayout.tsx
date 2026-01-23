import type { ReactNode } from 'react'
import styles from './AppLayout.module.css'

type AppLayoutProps = {
    children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className={styles.root}>
            <main className={styles.container}>{children}</main>
        </div>
    )
}
