import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'online_store_new',
    user: process.env.DB_USER || 'andrejmusovec',
    password: process.env.DB_PASSWORD || '',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database')
})

pool.on('error', err => {
    console.error('Unexpected database error:', err)
    process.exit(-1)
})

export const testConnection = async () => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT NOW()')
        console.log('Database connection test successful:', result.rows[0].now)
        client.release()
        return true
    } catch (error) {
        console.error('Database connection test failed:', error)
        return false
    }
}

export default pool
