import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from '@/store/reducers/catalog/catalogSlice'
import advertisementReducer from '@/store/reducers/advertisement/advertisementSlice'
import reviewsReducer from '@/store/reducers/reviews/reviewsSlice'
import sellerReducer from '@/store/reducers/seller/sellerSlice'

export const setupStore = () => {
    return configureStore({
        reducer: {
            catalog: catalogReducer,
            advertisement: advertisementReducer,
            reviews: reviewsReducer,
            seller: sellerReducer,
        },
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
