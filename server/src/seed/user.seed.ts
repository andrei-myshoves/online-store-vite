import User from '../models/User'

export async function seedUsers() {
    const existing = await User.count()
    if (existing > 0) return

    await User.create({
        email: 'test@test.com',
        password: 'hashed-password',
        username: 'testuser',
        role: 'USER',
    })
}
