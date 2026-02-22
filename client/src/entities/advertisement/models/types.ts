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

export type Review = {
    id: number
    text: string
    rating: number
    createdAt: string
    user: {
        username: string
        avatar: string | null
    }
}
