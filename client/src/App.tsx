import { Button } from './shared/ui/Button'
import './style.css'

function App() {
    return (
        <div style={{ padding: 24 }}>
            <Button>Primary</Button>

            <Button variant="outline">Outline</Button>

            <Button variant="outlineReverse">Outline reverse</Button>

            <Button variant="wrapper">Wrapper</Button>

            <Button disabled>Disabled</Button>
        </div>
    )
}

export default App
