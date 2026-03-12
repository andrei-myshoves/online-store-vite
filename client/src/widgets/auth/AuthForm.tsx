import { Input } from '@/shared/ui/input/Input'
import { Button } from '@/shared/ui/button/Button'
import styles from './AuthForms.module.css'
import { useState } from 'react'
import { api } from '@/shared/api/api'
import { useNavigate } from '@tanstack/react-router'

export const AuthForm = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleModeChange = () => {
        setMode(mode === 'login' ? 'register' : 'login')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (mode === 'login') {
                const { data } = await api.post('/auth/login', {
                    email,
                    password,
                })

                localStorage.setItem('token', data.token)

                navigate({ to: '/profile' })
            } else {
                await api.post('/auth/register', {
                    email,
                    password,
                    username,
                })

                setMode('login')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {mode === 'register' && (
                    <>
                        <Input type="password" placeholder="Повторите пароль" />
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
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
