import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { ProfileSettings } from '@/widgets/ProfileSettings/ProfileSettings'
import { fetchProfile } from '@/store/reducers/profile/profileThunks'
import { selectProfile, selectProfileLoading, selectProfileError } from '@/store/reducers/selectors/profileSelectors'
import styles from './ProfilePage.module.css'
import { ProfileAdvertisements } from '@/widgets/ProfileAdvertisements/ProfileAdvertisements'
import { useTranslation } from 'react-i18next'

const ProfilePage = () => {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectProfile)
    const isLoading = useAppSelector(selectProfileLoading)
    const error = useAppSelector(selectProfileError)
    const { t } = useTranslation('profile')

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    if (isLoading) {
        return <div>{t('loadingProfile')}</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className={styles.wrapper}>
            <AdvertisementTopBar />

            <div className={styles.page}>
                {profile && <ProfileSettings profile={profile} />}
                {profile && profile.id !== undefined && <ProfileAdvertisements userId={profile.id} />}{' '}
            </div>
        </div>
    )
}

export default ProfilePage
