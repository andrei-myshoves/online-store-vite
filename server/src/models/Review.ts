import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class Review extends Model {
    declare id: number
    declare text: string
    declare rating: number
    declare userId: number
    declare advertisementId: number
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        advertisementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'reviews',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'advertisementId'],
            },
        ],
    }
)

export default Review
