import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'

export const withStore = (mockState?: any) => {
    const store = setupStore(mockState)

    const originalDispatch = store.dispatch

    store.dispatch = (action: any) => {
        if (typeof action === 'function') {
            return null
        }
        return originalDispatch(action)
    }

    return (Story: any) => (
        <Provider store={store}>
            <Story />
        </Provider>
    )
}
