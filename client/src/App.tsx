import { useState } from 'react'
import { AuthModal } from '../src/widgets/auth/AuthModal'
import { Button } from '../src/shared/ui/button/Button'
import './style.css'

function App() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Открыть авторизацию</Button>

            <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}

export default App
