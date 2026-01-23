import { Outlet } from '@tanstack/react-router'
import { AppLayout } from '@/app/layout/AppLayout'

export const App = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
}
