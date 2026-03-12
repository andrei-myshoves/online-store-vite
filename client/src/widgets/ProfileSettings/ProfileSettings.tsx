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

import type { Profile } from '@/entities/advertisement/models/types'
import styles from './ProfileSettings.module.css'

type Props = {
    profile: Profile
}

export const ProfileSettings = ({ profile }: Props) => {
    const dispatch = useAppDispatch()

    const isEditingProfile = useAppSelector(state => state.profile.isEditingProfile)

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

    const handleEnableEdit = () => {
        dispatch(enableProfileEditing())
    }

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.greeting}>Здравствуйте, {profile.username}!</h1>

            <h2 className={styles.title}>Настройки профиля</h2>

            <div className={styles.profileBlock}>
                <div className={styles.avatarBlock}>
                    <div className={styles.avatar} />
                    <button className={styles.changeAvatar}>Заменить</button>
                </div>

                <div className={styles.form}>
                    <Input
                        placeholder="Имя"
                        value={profile.username}
                        onChange={onChangeUsername}
                        disabled={!isEditingProfile}
                    />

                    <Input
                        placeholder="Фамилия"
                        value={profile.lastName ?? ''}
                        onChange={onChangeLastName}
                        disabled={!isEditingProfile}
                    />

                    <Input
                        className={styles.city}
                        placeholder="Город"
                        value={profile.city ?? ''}
                        onChange={onChangeCity}
                        disabled={!isEditingProfile}
                    />

                    <Input
                        className={styles.phone}
                        placeholder="Телефон"
                        value={profile.phone ?? ''}
                        onChange={onChangePhone}
                        disabled={!isEditingProfile}
                    />

                    {!isEditingProfile ? (
                        <Button className={styles.saveButton} onClick={handleEnableEdit}>
                            Изменить данные
                        </Button>
                    ) : (
                        <Button className={styles.saveButton}>Сохранить</Button>
                    )}
                </div>
            </div>
        </section>
    )
}
