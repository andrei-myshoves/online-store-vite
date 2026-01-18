import { useState } from 'react'
import { Modal } from '../../shared/ui/modal'
import { AuthForm } from './AuthForm'
import Logo from '../../assets/Logo.svg'
import styles from './AuthForms.module.css'

type AuthModalProps = {
    isOpen: boolean
    onClose: () => void
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [mode, setMode] = useState<'login' | 'register'>('login')

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

                <AuthForm mode={mode} onModeChange={setMode} />
            </div>
        </Modal>
    )
}
