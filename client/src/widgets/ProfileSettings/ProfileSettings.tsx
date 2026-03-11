import { useState, useEffect } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import type { Profile } from '@/entities/advertisement/models/types'
import styles from './ProfileSettings.module.css'

type Props = {
    profile: Profile | null
}

export const ProfileSettings = ({ profile }: Props) => {
    const [username, setUsername] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (profile) {
            setUsername(profile.username ?? '')
            setLastName(profile.lastName ?? '')
            setCity(profile.city ?? '')
            setPhone(profile.phone ?? '')
        }
    }, [profile])

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.greeting}>Здравствуйте, {username}!</h1>

            <h2 className={styles.title}>Настройки профиля</h2>

            <div className={styles.profileBlock}>
                <div className={styles.avatarBlock}>
                    <div className={styles.avatar} />
                    <button className={styles.changeAvatar}>Заменить</button>
                </div>

                <div className={styles.form}>
                    <Input placeholder="Имя" value={username} onChange={e => setUsername(e.target.value)} />

                    <Input placeholder="Фамилия" value={lastName} onChange={e => setLastName(e.target.value)} />

                    <Input
                        className={styles.city}
                        placeholder="Город"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    <Input
                        className={styles.phone}
                        placeholder="Телефон"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />

                    <Button className={styles.saveButton}>Сохранить</Button>
                </div>
            </div>
        </section>
    )
}
