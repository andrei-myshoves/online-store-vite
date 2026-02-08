import 'dotenv/config'
import sequelize from '../db'
import { seedUsers } from './user.seed'
import { seedAdvertisements } from './advertisement.seed'

async function seed() {
    try {
        await sequelize.authenticate()

        await seedUsers()
        await seedAdvertisements()

        console.log('DB seeded successfully')
        process.exit(0)
    } catch (e) {
        console.error(' DB seed failed', e)
        process.exit(1)
    }
}

seed()
