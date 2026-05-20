import { createRoute, createRouter, createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { rootRoute } from '@/app/router/rootRoute'
import type { FC } from 'react'

export const withRouter = (Story: FC) => {
    const sellerRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: '/seller/$id',
        component: Story,
    })

    const advertisementRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: '/advertisement/$id',
        component: Story,
    })

    const routeTree = rootRoute.addChildren([sellerRoute, advertisementRoute])

    const router = createRouter({
        routeTree,
        history: createMemoryHistory({
            initialEntries: ['/advertisement/1'],
        }),
    })

    return <RouterProvider router={router} />
}
