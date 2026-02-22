import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App'
import { setupStore } from '@/store/store'
import './style.css'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)
