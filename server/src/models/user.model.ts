import pool from '../config/database.js'
import { User, RegisterInput } from '../types/index.js'

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] || null
}

export const findUserById = async (id: string): Promise<User | null> => {
    const result = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] || null
}

export const createUser = async (data: RegisterInput & { password: string }): Promise<User> => {
    const { email, password, username } = data

    const result = await pool.query<User>(
        `INSERT INTO users (email, password, username)
      VALUES ($1, $2, $3)
     RETURNING *`,
        [email, password, username]
    )

    return result.rows[0]
}

export const updateUser = async (
    id: string,
    data: Partial<Omit<User, 'id' | 'email' | 'password' | 'created_at' | 'updated_at'>>
): Promise<User | null> => {
    const fields: string[] = []
    const values: (string | number | boolean | Date)[] = []
    let paramIndex = 1

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            fields.push(`${key} = $${paramIndex}`)
            values.push(value as string | number | boolean | Date)
            paramIndex++
        }
    })

    if (fields.length === 0) {
        return findUserById(id)
    }

    values.push(id)

    const result = await pool.query<User>(
        `UPDATE users
     SET ${fields.join(', ')}
     WHERE id = $${paramIndex}
     RETURNING *`,
        values
    )

    return result.rows[0] || null
}
