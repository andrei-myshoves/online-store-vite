import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdvertisementTopBar } from '@/shared/ui/AdvertisementTopBar/AdvertisementTopBar'
import { ProfileSettings } from '@/widgets/ProfileSettings/ProfileSettings'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { fetchProfile } from '@/store/reducers/profile/profileThunks'
import { selectProfile, selectProfileLoading, selectProfileError } from '@/store/reducers/selectors/profileSelectors'
import type { AppDispatch } from '@/store/store'
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const profile = useSelector(selectProfile)
    const isLoading = useSelector(selectProfileLoading)
    const error = useSelector(selectProfileError)

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
                <ProfileSettings profile={profile} />

                <AdvertisementsList title="Мои товары" items={[]} loading={false} error={null} />
            </div>
        </div>
    )
}
