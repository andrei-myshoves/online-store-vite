import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import styles from './ProfileSettings.module.css'
import type { Profile } from '@/entities/advertisement/models/types'

type Props = {
    profile: Profile | null
}

export const ProfileSettings = ({ profile }: Props) => {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.greeting}>Здравствуйте, {profile?.username ?? 'пользователь'}!</h1>

            <h2 className={styles.title}>Настройки профиля</h2>

            <div className={styles.profileBlock}>
                <div className={styles.avatarBlock}>
                    <div className={styles.avatar} />
                    <button className={styles.changeAvatar}>Заменить</button>
                </div>

                <div className={styles.form}>
                    <Input placeholder="Имя" defaultValue={profile?.username ?? ''} />

                    <Input placeholder="Фамилия" defaultValue={profile?.lastName ?? ''} />

                    <Input className={styles.city} placeholder="Город" defaultValue={profile?.city ?? ''} />

                    <Input className={styles.phone} placeholder="Телефон" defaultValue={profile?.phone ?? ''} />

                    <Button className={styles.saveButton}>Сохранить</Button>
                </div>
            </div>
        </section>
    )
}
