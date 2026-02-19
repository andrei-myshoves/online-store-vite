import { createRouter, createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage'
import { AboutPage } from '@/pages/AboutPage'
import { AdvertisementPage } from '@/pages/AdvertisementPage/AdvertisementPage'
import { ReviewsPage } from '@/pages/ReviewsPage/ReviewsPage'

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: CatalogPage,
})

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: AboutPage,
})

const advertisementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/advertisement/$id',
    component: AdvertisementPage,
})

const reviewsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/reviews/$slug',
    component: ReviewsPage,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, advertisementRoute, reviewsRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
