import { createRouter, createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage'
import { AdvertisementPage } from '@/pages/AdvertisementPage/AdvertisementPage'
import { ReviewsPage } from '@/pages/ReviewsPage/ReviewsPage'
import { SellerProfilePage } from '@/pages/SellerProfilePage/SellerProfilePage'

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: CatalogPage,
})

const advertisementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/advertisement/$id',
    component: AdvertisementPage,
})

const reviewsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/reviews/$id',
    component: ReviewsPage,
})

const sellerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/seller/$id',
    component: SellerProfilePage,
})

const routeTree = rootRoute.addChildren([indexRoute, advertisementRoute, reviewsRoute, sellerRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
