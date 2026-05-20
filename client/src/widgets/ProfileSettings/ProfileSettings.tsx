import { Input } from '@/shared/ui/input/Input'
import { Button } from '@/shared/ui/button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    changeUsername,
    changeLastName,
    changeCity,
    changePhone,
    enableProfileEditing,
} from '@/store/reducers/profile/profileSlice'
import { updateProfile } from '@/store/reducers/profile/profileThunks'
import { selectIsEditingProfile } from '@/store/reducers/selectors/profileSelectors'
import type { Profile } from '@/entities/advertisement/models/types'
import styles from './ProfileSettings.module.css'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

type Props = {
    profile: Profile
}

export const ProfileSettings = ({ profile }: Props) => {
    const dispatch = useAppDispatch()

    const isEditingProfile = useAppSelector(selectIsEditingProfile)

    const { t } = useTranslation('profile')

    const handleSave = () => {
        dispatch(updateProfile(profile))
    }

    const handleEnableEdit = () => {
        dispatch(enableProfileEditing())
    }

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeUsername(e.target.value))
    }

    const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeLastName(e.target.value))
    }

    const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCity(e.target.value))
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePhone(e.target.value))
    }

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.greeting}>
                {t('greeting', {
                    username: profile.username,
                })}
            </h1>

            <h2 className={styles.title}>{t('settings')}</h2>

            <div className={styles.profileBlock}>
                <div className={styles.avatarBlock}>
                    <div className={styles.avatar} />
                    <button className={styles.changeAvatar}>{t('replaceAvatar')}</button>
                </div>
                <div className={styles.form}>
                    <Input
                        label={t('name')}
                        value={profile.username}
                        onChange={onChangeUsername}
                        disabled={!isEditingProfile}
                        className={styles.profileInput}
                    />

                    <Input
                        label={t('lastName')}
                        value={profile.lastName ?? ''}
                        onChange={onChangeLastName}
                        disabled={!isEditingProfile}
                        className={styles.profileInput}
                    />

                    <Input
                        label={t('city')}
                        value={profile.city ?? ''}
                        onChange={onChangeCity}
                        disabled={!isEditingProfile}
                        className={styles.profileInput}
                    />

                    <Input
                        label={t('phone')}
                        value={profile.phone ?? ''}
                        onChange={onChangePhone}
                        disabled={!isEditingProfile}
                        className={clsx(styles.profileInput, styles.fullWidth)}
                    />

                    {!isEditingProfile ? (
                        <Button className={styles.saveButton} onClick={handleEnableEdit}>
                            {t('editData')}
                        </Button>
                    ) : (
                        <Button className={styles.saveButton} onClick={handleSave}>
                            {t('save')}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}
