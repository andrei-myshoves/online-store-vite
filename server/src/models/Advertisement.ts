import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'

interface AdvertisementAttributes {
    id: number
    name: string
    description: string
    price: number
    city: string
    images?: string[]
    userId: string
    reviewsCount: number
    slug: string
    isPublished: boolean
    createdAt?: Date
    updatedAt?: Date
}

interface AdvertisementCreationAttributes extends Optional<
    AdvertisementAttributes,
    'id' | 'images' | 'reviewsCount' | 'slug' | 'createdAt' | 'updatedAt' | 'isPublished'
> {}

class Advertisement
    extends Model<AdvertisementAttributes, AdvertisementCreationAttributes>
    implements AdvertisementAttributes
{
    declare id: number
    declare name: string
    declare description: string
    declare price: number
    declare city: string
    declare images?: string[]
    declare userId: string
    declare reviewsCount: number
    declare slug: string
    declare isPublished: boolean
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
        city: {
            type: DataTypes.STRING,
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
        reviewsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },

    {
        sequelize,
        tableName: 'advertisements',
        timestamps: true,
    }
)

export default Advertisement
