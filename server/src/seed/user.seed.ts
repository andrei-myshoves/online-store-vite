import { faker } from '@faker-js/faker'
import User from '../models/User'

export async function seedUsers(count = 50) {
    const users = []

    for (let i = 0; i < count; i++) {
        users.push({
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.person.firstName(),
            role: 'USER',
        })
    }

    return User.bulkCreate(users, { returning: true })
}
