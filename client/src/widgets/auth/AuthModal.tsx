import { Modal } from '@/shared/ui/modal'
import { AuthForm } from './AuthForm'
import { LogoIcon } from '@/shared/ui/icons'
import styles from './AuthForms.module.css'

type AuthModalProps = {
    isOpen: boolean
    onClose: () => void
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <LogoIcon />
                </div>

                <AuthForm />
            </div>
        </Modal>
    )
}
