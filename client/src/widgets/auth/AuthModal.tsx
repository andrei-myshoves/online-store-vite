import { useState } from 'react'
import { Modal } from '../../shared/ui/modal'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import Logo from '../../assets/Logo.svg'
import styles from './AuthForms.module.css'

type AuthMode = 'login' | 'register'

type AuthModalProps = {
    isOpen: boolean
    onClose: () => void
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [mode, setMode] = useState<AuthMode>('login')

    const handleClose = () => {
        setMode('login')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={Logo} alt="Logo" />
                </div>

                {mode === 'login' && <LoginForm onRegisterClick={() => setMode('register')} />}

                {mode === 'register' && <RegisterForm />}
            </div>
        </Modal>
    )
}
