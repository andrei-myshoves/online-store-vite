import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import './models/associations.js'
import cors from 'cors'
import { errorMiddleware } from './middleware/error.middleware.js'

import path from 'path'
import router from './routes'

import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, '../static')))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        if (process.env.NODE_ENV !== 'production') {
            app.get('/api-docs/json', (_, res) => {
                res.json(swaggerSpec)
            })

            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
        }

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
