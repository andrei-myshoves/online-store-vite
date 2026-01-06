import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import pool, { testConnection } from './config/database.js'
import authRoutes from './routes/auth.routes.js'
import { errorMiddleware } from './middleware/error.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(errorMiddleware)

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    })
})

app.get('/health/db', async (_req: Request, res: Response) => {
    try {
        const client = await pool.connect()
        await client.query('SELECT 1')
        client.release()
        res.status(200).json({ status: 'OK', message: 'Database connected' })
    } catch (error: unknown) {
        console.error('DB health check failed:', error)
        res.status(500).json({ status: 'ERROR', message: 'Database connection failed' })
    }
})

app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Online Store API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            dbHealth: '/health/db',
            api: '/api',
        },
    })
})

// API Routes
app.use('/api/auth', authRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.url} not found`,
    })
})

const startServer = async () => {
    try {
        const dbConnected = await testConnection()

        if (!dbConnected) {
            console.error('Failed to connect to database. Server not started.')
            process.exit(1)
        }

        // Запуск сервера
        app.listen(PORT, () => {
            console.log('================================')
            console.log(`Server is running on port ${PORT}`)
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
            console.log(`URL: http://localhost:${PORT}`)
            console.log('================================')
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully')
    await pool.end()
    process.exit(0)
})

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully')
    await pool.end()
    process.exit(0)
})

export default app
