import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { App } from '@/App'
import { HomePage } from '@/pages/HomePage'

const rootRoute = createRootRoute({
    component: App,
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})

const routeTree = rootRoute.addChildren([homeRoute])

export const router = createRouter({
    routeTree,
})
