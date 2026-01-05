import { User } from './index.js'

export type PublicUser = Omit<User, 'password'>
