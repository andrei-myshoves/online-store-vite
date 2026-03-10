import { ProfileSettings } from '@/widgets/ProfileSettings/ProfileSettings'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { UserAdvertisements } from '@/widgets/UserAdvertisements/UserAdvertisements'
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
    return (
        <div className={styles.wrapper}>
            <AdvertisementTopBar />

            <div className={styles.page}>
                <ProfileSettings />
                <UserAdvertisements />
            </div>
        </div>
    )
}
