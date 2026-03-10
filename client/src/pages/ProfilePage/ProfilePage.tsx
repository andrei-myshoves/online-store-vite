import { ProfileSettings } from '@/widgets/ProfileSettings/ProfileSettings'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { AdvList } from '@/widgets/adv-list/AdvList'
import type { Advertisement } from '@/entities/advertisement/models/types'
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
    const advertisements: Advertisement[] = []

    return (
        <div className={styles.wrapper}>
            <AdvertisementTopBar />

            <div className={styles.page}>
                <ProfileSettings />

                <section>
                    <AdvList title="Мои товары" items={advertisements} loading={false} error={null} />
                </section>
            </div>
        </div>
    )
}
