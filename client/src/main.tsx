import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/app/router/router'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
