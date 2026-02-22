import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from '@/store/reducers/catalog/catalogSlice'
import advertisementReducer from '@/store/reducers/advertisement/advertisementSlice'
import reviewsReducer from '@/store/reducers/reviews/reviewsSlice'

export const setupStore = () => {
    return configureStore({
        reducer: {
            catalog: catalogReducer,
            advertisement: advertisementReducer,
            reviews: reviewsReducer,
        },
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
