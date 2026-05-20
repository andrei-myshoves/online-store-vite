import { Input } from '@/shared/ui/input/Input'
import { Button } from '@/shared/ui/button/Button'
import styles from './AuthForms.module.css'
import { useState } from 'react'
import { api } from '@/shared/api/api'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setEmail, setPassword, setUsername, setUser } from '@/store/reducers/auth/authSlice'
import { useTranslation } from 'react-i18next'

const AuthForm = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.auth.email)
    const password = useAppSelector(state => state.auth.password)
    const username = useAppSelector(state => state.auth.username)
    const { t } = useTranslation('auth')

    const isLoginMode = mode === 'login'

    const handleModeChange = () => {
        setMode(isLoginMode ? 'register' : 'login')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (isLoginMode) {
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
                    placeholder={t('email')}
                    value={email}
                    onChange={e => dispatch(setEmail(e.target.value))}
                />

                <Input
                    type="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={e => dispatch(setPassword(e.target.value))}
                />

                {!isLoginMode && (
                    <>
                        <Input type="password" placeholder={t('repeatPassword')} />
                        <Input
                            type="text"
                            placeholder={t('username')}
                            value={username}
                            onChange={e => dispatch(setUsername(e.target.value))}
                        />
                        <Input type="text" placeholder={t('surnameOptional')} />
                        <Input type="text" placeholder={t('cityOptional')} />
                    </>
                )}
            </div>

            <div className={styles.actions}>
                <Button type="submit" variant="primary">
                    {isLoginMode ? t('login') : t('register')}
                </Button>

                <Button type="button" variant="outline" onClick={handleModeChange}>
                    {isLoginMode ? t('register') : t('login')}
                </Button>
            </div>
        </form>
    )
}

export default AuthForm
