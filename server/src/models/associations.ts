import Review from './Review.js'
import User from './User.js'
import Advertisement from './Advertisement.js'

User.hasMany(Review, { foreignKey: 'userId' })
Review.belongsTo(User, { foreignKey: 'userId' })

Advertisement.hasMany(Review, { foreignKey: 'advertisementId' })
Review.belongsTo(Advertisement, { foreignKey: 'advertisementId' })
