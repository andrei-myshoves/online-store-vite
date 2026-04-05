import { Input } from '@/shared/ui/input/Input'
import { Button } from '@/shared/ui/button/Button'
import styles from './AuthForms.module.css'
import { useState } from 'react'
import { api } from '@/shared/api/api'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setEmail, setPassword, setUsername, setUser } from '@/store/reducers/auth/authSlice'

export const AuthForm = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.auth.email)
    const password = useAppSelector(state => state.auth.password)
    const username = useAppSelector(state => state.auth.username)

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
                if (!data) return

                Cookies.set('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch(setUser(data.user))

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
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => dispatch(setEmail(e.target.value))}
                />

                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => dispatch(setPassword(e.target.value))}
                />

                {mode === 'register' && (
                    <>
                        <Input type="password" placeholder="Повторите пароль" />
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => dispatch(setUsername(e.target.value))}
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
