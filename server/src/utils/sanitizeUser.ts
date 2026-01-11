import User from '../models/User'
import { PublicUser } from '../types/user.types'

export const sanitizeUser = (user: User): PublicUser => {
    const { password: _password, ...safeUser } = user.get()
    return safeUser
}
