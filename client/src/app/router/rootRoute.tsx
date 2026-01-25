import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import styles from './RootLayout.module.css'

export const rootRoute = createRootRoute({
    component: () => (
        <div className={styles.root}>
            <header className={styles.header}>
                <Link to="/">Catalog</Link>
                <Link to="/about">About</Link>
            </header>

            <main className={styles.container}>
                <Outlet />
            </main>

            <TanStackRouterDevtools />
        </div>
    ),
})
