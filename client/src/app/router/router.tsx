import { createRouter, createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'
import { lazy } from 'react'

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',

    validateSearch: (search: Record<string, unknown>) => {
        return {
            search: typeof search.search === 'string' ? search.search : '',
            page: Number(search.page) || 1,
        }
    },

    component: lazy(() => import('@/pages/CatalogPage/CatalogPage')),
})

const profilePage = createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: lazy(() => import('@/pages/ProfilePage/ProfilePage')),
})

const advertisementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/advertisement/$id',
    component: lazy(() => import('@/pages/AdvertisementPage/AdvertisementPage')),
})

const reviewsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/reviews/$id',
    component: lazy(() => import('@/pages/ReviewsPage/ReviewsPage')),
})

const sellerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/seller/$id',
    component: lazy(() => import('@/pages/SellerProfilePage/SellerProfilePage')),
})

const routeTree = rootRoute.addChildren([indexRoute, profilePage, advertisementRoute, reviewsRoute, sellerRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
