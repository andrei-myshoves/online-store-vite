import Advertisement from '../models/Advertisement'
import { faker } from '@faker-js/faker'
import User from '../models/User'

const ADS_COUNT = 50

export async function seedAdvertisements() {
    const count = await Advertisement.count()
    if (count > 0) return

    const user = await User.findOne()
    if (!user) throw new Error('No user found for advertisements')

    const ads = Array.from({ length: ADS_COUNT }).map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ min: 50, max: 5000 })),
        images: [faker.image.url()],
        userId: user.id.toString(),
    }))

    await Advertisement.bulkCreate(ads)
}
