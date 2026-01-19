import { Input } from '../../shared/ui/input/Input'
import { Button } from '../../shared/ui/button/Button'
import styles from './AuthForms.module.css'
import { useState } from 'react'

export const AuthForm = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login')

    const handleModeChange = () => {
        setMode(mode === 'login' ? 'register' : 'login')
    }

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

                <Button type="button" variant="outline" onClick={handleModeChange}>
                    {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
                </Button>
            </div>
        </form>
    )
}
