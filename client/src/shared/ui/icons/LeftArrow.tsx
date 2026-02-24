import type { SVGProps } from 'react'

export const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M10.4143 0.707153L1.41431 9.70715L10.4143 18.7072"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
