import { faker } from '@faker-js/faker'
import Advertisement from '../models/Advertisement'
import type User from '../models/User'

export async function seedAdvertisements(users: User[]) {
    const advertisements = []

    for (const user of users) {
        const adsCount = faker.number.int({ min: 50, max: 100 })

        for (let i = 0; i < adsCount; i++) {
            advertisements.push({
                name: faker.commerce.productName(),
                slug: faker.helpers.slugify(faker.commerce.productName()) + '-' + faker.string.uuid(),
                description: faker.commerce.productDescription(),
                price: faker.number.int({ min: 100, max: 100_000 }),
                images: [faker.image.url()],
                userId: String(user.id),
            })
        }
    }

    await Advertisement.bulkCreate(advertisements)
}
