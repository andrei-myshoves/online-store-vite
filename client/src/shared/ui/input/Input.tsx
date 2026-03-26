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
    inputClassName?: string
}

export const Input = ({
    variant = 'default',
    error = false,
    label,
    errorText,
    className,
    inputClassName,
    disabled,
    id: externalId,
    type = 'text',
    ...rest
}: InputProps) => {
    const internalId = useId()
    const id = externalId || internalId

    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <input
                {...rest}
                id={id}
                type={type}
                disabled={disabled}
                aria-invalid={error}
                className={clsx(
                    styles.input,
                    styles[variant],
                    error && styles.error,
                    disabled && styles.disabled,
                    inputClassName
                )}
            />

            {errorText && <span className={styles.errorText}>{errorText}</span>}
        </div>
    )
}
