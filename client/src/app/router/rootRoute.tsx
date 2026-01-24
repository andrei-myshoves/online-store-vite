import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import styles from './RootLayout.module.css'

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <header>
                <Link to="/">Catalog</Link> <Link to="/about">About</Link>
            </header>

            <div className={styles.root}>
                <main className={styles.container}>
                    <Outlet />
                </main>
            </div>

            <TanStackRouterDevtools />
        </>
    ),
})
