import { Modal } from '@/shared/ui/modal'
import { lazy, Suspense } from 'react'
import { LogoIcon } from '@/shared/ui/icons'
import styles from './AuthForms.module.css'
import { Loader } from '@/shared/ui/loader/Loader'

const AuthForm = lazy(() => import('./AuthForm'))

type AuthModalProps = {
    isOpen: boolean
    onClose: () => void
}
const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <LogoIcon />
                </div>

                {isOpen && (
                    <Suspense fallback={<Loader />}>
                        <AuthForm />
                    </Suspense>
                )}
            </div>
        </Modal>
    )
}

export default AuthModal
