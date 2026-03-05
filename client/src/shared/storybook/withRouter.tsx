import { createRoute, createRouter, createMemoryHistory, RouterProvider } from '@tanstack/react-router'

import { rootRoute } from '@/app/router/rootRoute'

export const withRouter = (Story: any) => {
    const storyRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: '/seller/$id',
        component: Story,
    })

    const routeTree = rootRoute.addChildren([storyRoute])

    const router = createRouter({
        routeTree,
        history: createMemoryHistory({
            initialEntries: ['/seller/1'],
        }),
    })

    return <RouterProvider router={router} />
}
