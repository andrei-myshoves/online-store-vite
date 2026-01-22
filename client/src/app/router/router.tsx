import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { AppLayout } from '@/app/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'

const rootRoute = createRootRoute({
    component: AppLayout,
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
