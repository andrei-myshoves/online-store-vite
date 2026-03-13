import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { ProfileSettings } from '@/widgets/ProfileSettings/ProfileSettings'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { fetchProfile } from '@/store/reducers/profile/profileThunks'
import { selectProfile, selectProfileLoading, selectProfileError } from '@/store/reducers/selectors/profileSelectors'
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectProfile)
    const isLoading = useAppSelector(selectProfileLoading)
    const error = useAppSelector(selectProfileError)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    if (isLoading) {
        return <div>Загрузка профиля...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className={styles.wrapper}>
            <AdvertisementTopBar />

            <div className={styles.page}>
                {profile && <ProfileSettings profile={profile} />}

                <AdvertisementsList title="Мои товары" items={[]} loading={false} error={null} />
            </div>
        </div>
    )
}
