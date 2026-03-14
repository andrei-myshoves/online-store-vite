import { configureStore, combineReducers } from '@reduxjs/toolkit'
import catalogReducer from '@/store/reducers/catalog/catalogSlice'
import advertisementReducer from '@/store/reducers/advertisement/advertisementSlice'
import reviewsReducer from '@/store/reducers/reviews/reviewsSlice'
import sellerReducer from '@/store/reducers/seller/sellerSlice'
import profileReducer from '@/store/reducers/profile/profileSlice'
import authReducer from './reducers/auth/authSlice'

const rootReducer = combineReducers({
    catalog: catalogReducer,
    advertisement: advertisementReducer,
    reviews: reviewsReducer,
    seller: sellerReducer,
    profile: profileReducer,
    auth: authReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
