import clsx from 'clsx'
import styles from './Input.module.css'
import type React from 'react'
import { useId } from 'react'

export type InputVariant = 'default' | 'outline'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant
    error?: boolean
    label?: string
    errorText?: string
    wrapperClassName?: string
}

export const Input = ({
    variant = 'default',
    error = false,
    label,
    errorText,
    className,
    disabled,
    wrapperClassName,
    id,
    type = 'text',
    ...rest
}: InputProps) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
        <div className={clsx(styles.wrapper, wrapperClassName)}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
            )}

            <input
                {...rest}
                id={inputId}
                type={type}
                disabled={disabled}
                aria-invalid={error}
                className={clsx(
                    styles.input,
                    styles[variant],
                    error && styles.error,
                    disabled && styles.disabled,
                    className
                )}
            />

            {errorText && <span className={styles.errorText}>{errorText}</span>}
        </div>
    )
}
