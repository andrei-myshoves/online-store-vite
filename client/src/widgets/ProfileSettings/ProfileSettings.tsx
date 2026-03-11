import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import styles from './ProfileSettings.module.css'

export const ProfileSettings = () => {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.greeting}>Здравствуйте, Антон!</h1>

            <h2 className={styles.title}>Настройки профиля</h2>

            <div className={styles.profileBlock}>
                <div className={styles.avatarBlock}>
                    <div className={styles.avatar} />
                    <button className={styles.changeAvatar}>Заменить</button>
                </div>

                <div className={styles.form}>
                    <Input placeholder="Имя" />

                    <Input placeholder="Фамилия" />

                    <Input className={styles.city} placeholder="Город" />

                    <Input className={styles.phone} placeholder="Телефон" />

                    <Button className={styles.saveButton}>Сохранить</Button>
                </div>
            </div>
        </section>
    )
}
