import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/app/router/router'
import { Provider } from 'react-redux'
import { setupStore } from '@/store/store'
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { setUser } from '@/store/reducers/auth/authSlice'

const store = setupStore()

const AppContent = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const userRaw = localStorage.getItem('user')

        if (userRaw) {
            try {
                const user = JSON.parse(userRaw)

                if (user?.id) {
                    dispatch(setUser(user))
                }
            } catch (e) {
                console.error('Invalid user in localStorage')
            }
        }
    }, [dispatch])

    return <RouterProvider router={router} />
}

export const App = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}
