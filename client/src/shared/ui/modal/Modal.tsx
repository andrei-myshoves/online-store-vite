import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Modal.module.css'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
    useEffect(() => {
        if (!isOpen) {
            return
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={clsx(styles.modal, className)} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    )
}
