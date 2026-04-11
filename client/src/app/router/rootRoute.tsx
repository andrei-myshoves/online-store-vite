import { createRootRoute, Outlet } from '@tanstack/react-router'
import styles from './RootLayout.module.css'
import { Suspense } from 'react'
import { Header } from '@/widgets/header/Header'
import { Footer } from '@/widgets/footer/Footer'
import { Loader } from '@/shared/ui/loader/Loader'

export const rootRoute = createRootRoute({
    component: () => (
        <div className={styles.root}>
            <Header />

            <main className={styles.container}>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />
        </div>
    ),
})
