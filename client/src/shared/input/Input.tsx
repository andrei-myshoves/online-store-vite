import clsx from 'clsx'
import styles from './Input.module.css'
import type React from 'react'

export type InputVariant = 'default' | 'outline'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant
    error?: boolean
}

export const Input = ({ error, className, ...props }: InputProps) => {
    return (
        <input
            {...props}
            className={clsx(
                styles.input,
                props.variant && styles[props.variant],
                error && styles.error,
                props.disabled && styles.disabled,
                className
            )}
        />
    )
}
