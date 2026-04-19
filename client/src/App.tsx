import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/app/router/router'
import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'
import { setUser } from '@/store/reducers/auth/authSlice'

const store = setupStore()

const userRaw = localStorage.getItem('user')

if (userRaw) {
    try {
        const user = JSON.parse(userRaw)

        if (user?.id) {
            store.dispatch(setUser(user))
        }
    } catch {
        console.error('Invalid user in localStorage')
    }
}

export const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}
