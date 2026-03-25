import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import styles from './CreateAdvertisementForm.module.css'

type Props = {
    loading?: boolean
    error?: string | null
    disabled?: boolean
    onSubmit?: (data: { name: string; description: string; price: number }) => void
}

export const CreateAdvertisementForm = ({ loading = false, error = null, disabled = false, onSubmit }: Props) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
    })

    const handleSubmit = () => {
        const price = Number(form.price)

        if (!form.name.trim() || !form.description.trim() || price <= 0 || disabled) return

        onSubmit?.({
            name: form.name,
            description: form.description,
            price,
        })
    }

    return (
        <div className={styles.form}>
            <Input
                placeholder="Название"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                disabled={loading || disabled}
            />

            <textarea
                className={styles.textarea}
                placeholder="Описание"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                disabled={loading || disabled}
            />

            <Input
                placeholder="Цена"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                disabled={loading || disabled}
            />

            {error && <div className={styles.error}>{error}</div>}

            <Button
                onClick={handleSubmit}
                disabled={
                    !form.name.trim() || !form.description.trim() || Number(form.price) <= 0 || loading || disabled
                }
            >
                {loading ? 'Публикация...' : 'Опубликовать'}
            </Button>
        </div>
    )
}
