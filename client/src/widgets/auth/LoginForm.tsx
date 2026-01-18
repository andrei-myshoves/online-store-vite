import styles from './AuthForms.module.css'
import { Input } from '../../shared/ui/input/Input'
import { Button } from '../../shared/ui/button/Button'

interface LoginFormProps {
    onRegisterClick: () => void
}

export const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
    return (
        <form className={styles.form}>
            <div className={styles.fields}>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Пароль" />
            </div>

            <div className={styles.actions}>
                <Button type="submit" variant="primary">
                    Войти
                </Button>

                <Button type="button" variant="outline" onClick={onRegisterClick}>
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    )
}
