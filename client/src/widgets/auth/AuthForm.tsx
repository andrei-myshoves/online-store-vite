import { Input } from '../../shared/ui/input/Input'
import { Button } from '../../shared/ui/button/Button'
import styles from './AuthForms.module.css'

type AuthMode = 'login' | 'register'

interface AuthFormProps {
    mode: AuthMode
    onModeChange: (mode: AuthMode) => void
}

export const AuthForm = ({ mode, onModeChange }: AuthFormProps) => {
    return (
        <form className={styles.form}>
            <div className={styles.fields}>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Пароль" />

                {mode === 'register' && (
                    <>
                        <Input type="password" placeholder="Повторите пароль" />
                        <Input type="text" placeholder="Имя (необязательно)" />
                        <Input type="text" placeholder="Фамилия (необязательно)" />
                        <Input type="text" placeholder="Город (необязательно)" />
                    </>
                )}
            </div>

            <div className={styles.actions}>
                <Button type="submit" variant="primary">
                    {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>

                {mode === 'login' && (
                    <Button type="button" variant="outline" onClick={() => onModeChange('register')}>
                        Зарегистрироваться
                    </Button>
                )}

                {mode === 'register' && (
                    <Button type="button" variant="outline" onClick={() => onModeChange('login')}>
                        Войти
                    </Button>
                )}
            </div>
        </form>
    )
}
