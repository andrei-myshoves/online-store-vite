export interface User {
    id: string
    email: string
    password: string
    username: string
    first_name?: string
    last_name?: string
    city?: string
    phone?: string
    avatar?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface RegisterInput {
    email: string
    password: string
    username: string
}

export interface LoginInput {
    email: string
    password: string
}

export interface JWTPayload {
    userId: string
    email: string
}

export type UserResponse = Omit<User, 'password'>

export interface AuthResponse {
    token: string
    user: UserResponse
}

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload
        }
    }
}
