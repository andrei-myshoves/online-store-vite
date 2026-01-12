import clsx from 'clsx'
import styles from './Button.module.css'

import type { ButtonProps } from './types'

export const Button = ({
    children,
    variant = 'primary',
    onClick,
    disabled = false,
    type = 'button',
    className,
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(styles.button, styles[variant], disabled && styles.disabled, className)}
        >
            {children}
        </button>
    )
}
