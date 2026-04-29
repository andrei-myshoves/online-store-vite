import 'dotenv/config'
import sequelize from '../db.js'
import Advertisement from '../models/Advertisement.js'
import { Op } from 'sequelize'

const cleanup = async () => {
    console.log('[CRON] Cleanup started', new Date().toISOString())

    try {
        await sequelize.authenticate()

        const deleted = await Advertisement.destroy({
            where: {
                isPublished: false,
                updatedAt: {
                    [Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
            },
        })

        console.log(`[CRON] Deleted ${deleted} unpublished ads`)
        process.exit(0)
    } catch (e) {
        console.error('[CRON] Error:', e)
        process.exit(1)
    } finally {
        await sequelize.close()
    }
}

cleanup()
