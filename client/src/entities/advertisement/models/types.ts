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

export type Profile = {
    id: number
    username: string
    lastName: string | null
    email: string
    city: string | null
    phone: string | null
    avatar: string | null
    createdAt: string
}

export type UpdateProfileDto = {
    username: string
    lastName: string | null
    city: string | null
    phone: string | null
    avatar: string | null
}
