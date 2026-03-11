import { createRouter, createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage'
import { AdvertisementPage } from '@/pages/AdvertisementPage/AdvertisementPage'
import { ReviewsPage } from '@/pages/ReviewsPage/ReviewsPage'
import { SellerProfilePage } from '@/pages/SellerProfilePage/SellerProfilePage'
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage'

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: CatalogPage,
})

const profilePage = createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: ProfilePage,
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

const routeTree = rootRoute.addChildren([indexRoute, profilePage, advertisementRoute, reviewsRoute, sellerRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
