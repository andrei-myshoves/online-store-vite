import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppLayout } from '@/app/layout/AppLayout'

export const rootRoute = createRootRoute({
    component: () => (
        <AppLayout>
            <header style={{ padding: 12 }}>
                <Link to="/">Catalog</Link> <Link to="/about">About</Link>
            </header>

            <Outlet />
            <TanStackRouterDevtools />
        </AppLayout>
    ),
})
