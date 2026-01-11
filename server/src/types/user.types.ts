import User from '../models/User'
import { InferAttributes } from 'sequelize'

export type PublicUser = Omit<InferAttributes<User>, 'password'>
