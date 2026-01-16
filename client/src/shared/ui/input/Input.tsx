import clsx from 'clsx'
import styles from './Input.module.css'
import type React from 'react'

export type InputVariant = 'default' | 'outline'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant
    error?: boolean
}

export const Input = ({ variant = 'default', error = false, className, disabled, ...rest }: InputProps) => {
    return (
        <input
            {...rest}
            disabled={disabled}
            className={clsx(
                styles.input,
                styles[variant],
                error && styles.error,
                disabled && styles.disabled,
                className
            )}
        />
    )
}
