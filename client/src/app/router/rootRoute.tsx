import { createRootRoute, Outlet } from '@tanstack/react-router'
import styles from './RootLayout.module.css'
import { Header } from '@/widgets/header/Header'
import { Footer } from '@/widgets/footer/Footer'

export const rootRoute = createRootRoute({
    component: () => (
        <div className={styles.root}>
            <Header />

            <main className={styles.container}>
                <Outlet />
            </main>
            <Footer />
        </div>
    ),
})
