import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'

interface AdvertisementAttributes {
    id: number
    name: string
    description: string
    price: number
    images?: string[]
    userId: number
    createdAt?: Date
    updatedAt?: Date
}

interface AdvertisementCreationAttributes extends Optional<
    AdvertisementAttributes,
    'id' | 'images' | 'createdAt' | 'updatedAt'
> {}

class Advertisement
    extends Model<AdvertisementAttributes, AdvertisementCreationAttributes>
    implements AdvertisementAttributes
{
    declare id: number
    declare name: string
    declare description: string
    declare price: number
    declare images?: string[]
    declare userId: number
    declare createdAt?: Date
    declare updatedAt?: Date
}

Advertisement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'advertisements',
        timestamps: true,
    }
)

export default Advertisement
