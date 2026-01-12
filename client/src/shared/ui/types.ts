import type React from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'outlineReverse' | 'wrapper'

export type ButtonProps = {
    children: React.ReactNode
    variant?: ButtonVariant
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    className?: string
}
