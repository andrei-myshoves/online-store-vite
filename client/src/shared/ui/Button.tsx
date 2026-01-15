import clsx from 'clsx'
import styles from './Button.module.css'
import type React from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'outlineReverse' | 'wrapper'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}

export const Button = ({ children, variant = 'primary', className, disabled, ...rest }: ButtonProps) => {
    return (
        <button
            className={clsx(styles.button, styles[variant], disabled && styles.disabled, className)}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}
