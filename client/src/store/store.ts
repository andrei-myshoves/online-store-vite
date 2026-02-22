import { configureStore } from '@reduxjs/toolkit'
import advertisementReducer from '@/store/reducers/advertisementSlice'

export const setupStore = () => {
    return configureStore({
        reducer: {
            advertisement: advertisementReducer,
        },
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
