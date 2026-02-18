import sequelize from '../db'
import { seedUsers } from './user.seed'
import { seedAdvertisements } from './advertisement.seed'
import { seedReviews } from './review.seed'

async function seed() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: true })

        const users = await seedUsers(50)
        await seedAdvertisements(users)
        await seedReviews(users)

        console.log('DB seeded successfully')
        process.exit(0)
    } catch (e) {
        console.error('Seeding failed', e)
        process.exit(1)
    }
}

seed()
