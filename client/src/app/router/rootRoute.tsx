import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import styles from './RootLayout.module.css'
import { Header } from '@/widgets/header/Header'

export const rootRoute = createRootRoute({
    component: () => (
        <div className={styles.root}>
            <Header />

            <main className={styles.container}>
                <Outlet />
            </main>

            <TanStackRouterDevtools />
        </div>
    ),
})
