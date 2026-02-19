import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import './models/associations.js'
import cors from 'cors'
import { errorMiddleware } from './middleware/error.middleware.js'

import path from 'path'
import router from './routes'

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve('./static')))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
