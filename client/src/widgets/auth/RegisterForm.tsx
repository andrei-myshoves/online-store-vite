import { Input } from '../../shared/ui/input/Input'
import { Button } from '../../shared/ui/button/Button'
import styles from './AuthForms.module.css'

export const RegisterForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.fields}>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Пароль" />
                <Input type="password" placeholder="Повторите пароль" />
                <Input type="text" placeholder="Имя (необязательно)" />
                <Input type="text" placeholder="Фамилия (необязательно)" />
                <Input type="text" placeholder="Город (необязательно)" />
            </div>

            <div className={styles.actions}>
                <Button type="submit" variant="primary">
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    )
}
