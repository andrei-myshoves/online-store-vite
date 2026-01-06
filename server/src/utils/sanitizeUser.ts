import UserModel from '../models/User.js'  // <-- это Sequelize модель
import { PublicUser } from '../types/user.types.js'

export const sanitizeUser = (user: UserModel): PublicUser => ({
  id: user.id.toString(),       // number -> string
  email: user.email,
  username: user.username,
  createdAt: user.createdAt,    // теперь TS видит поле
  updatedAt: user.updatedAt,
})