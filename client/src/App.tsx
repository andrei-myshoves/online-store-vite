import { Button } from './shared/ui/button/Button'
import './style.css'
import { useState } from 'react'
import { Modal } from './shared/ui/modal/Modal'

function App() {
    const [open, setOpen] = useState(false)

    return (
        <div style={{ padding: 40 }}>
            <Button onClick={() => setOpen(true)}>Open modal</Button>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div style={{ padding: 24 }}>
                    <h2>Modal title</h2>
                    <p>Modal content</p>

                    <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
            </Modal>
        </div>
    )
}

export default App
