import { User } from '../types/index.js'
import { PublicUser } from '../types/user.types.js'

export const sanitizeUser = (user: User): PublicUser => ({
    id: user.id,
    email: user.email,
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
})
