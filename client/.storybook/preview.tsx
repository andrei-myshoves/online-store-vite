import { Provider } from 'react-redux'
import type { Preview } from '@storybook/react'
import { setupStore } from '../src/store/store'

import { createRoute, createRouter, createMemoryHistory, RouterProvider } from '@tanstack/react-router'

import { rootRoute } from '../src/app/router/rootRoute'
import '../src/style.css'

const store = setupStore()

const preview: Preview = {
    decorators: [
        Story => {
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

            return (
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            )
        },
    ],
}

export default preview
