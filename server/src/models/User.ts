import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../db'

interface UserAttributes {
    id: number
    email: string
    password: string
    username: string
    role: string
    createdAt?: Date
    updatedAt?: Date 
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public email!: string
  public password!: string
  public username!: string
  public role!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'USER',
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
)

export default User
