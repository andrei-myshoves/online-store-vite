export type Advertisement = {
    id: number
    name: string
    description: string
    price: number
    images: string[] | null
    userId: string
    createdAt: string
    updatedAt: string
    reviewsCount?: number
}
