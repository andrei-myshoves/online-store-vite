import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/app/router/router'
import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'

const store = setupStore()

export const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}
