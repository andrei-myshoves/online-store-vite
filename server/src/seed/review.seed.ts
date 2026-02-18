import { faker } from '@faker-js/faker'
import Review from '../models/Review'
import Advertisement from '../models/Advertisement'
import type User from '../models/User'

export async function seedReviews(users: User[]) {
    const reviews = []

    const advertisements = await Advertisement.findAll()

    for (const ad of advertisements) {
        const reviewsCount = faker.number.int({ min: 0, max: 20 })

        const randomUsers = faker.helpers.arrayElements(
            users.filter(u => String(u.id) !== ad.userId),
            reviewsCount
        )

        for (const user of randomUsers) {
            reviews.push({
                advertisementId: ad.id,
                userId: String(user.id),
                rating: faker.number.int({ min: 1, max: 5 }),
                text: faker.lorem.sentence({ min: 10, max: 20 }),
            })
        }

        ad.set('reviewsCount', randomUsers.length)
        await ad.save()
    }

    if (reviews.length) {
        await Review.bulkCreate(reviews)
    }
}
