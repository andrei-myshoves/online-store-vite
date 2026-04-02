type AddFotoCreateAdverisementIconProps = {
    width?: number
    height?: number
    color?: string
}

export const AddFotoCreateAdverisementIcon = ({
    width = 30,
    height = 30,
    color = '#D9D9D9',
}: AddFotoCreateAdverisementIconProps) => (
    <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0V30" stroke={color} strokeWidth={3} />
        <path d="M30 15L0 15" stroke={color} strokeWidth={3} />
    </svg>
)
