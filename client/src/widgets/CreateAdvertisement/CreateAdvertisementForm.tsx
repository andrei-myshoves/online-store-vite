import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import styles from './CreateAdvertisementModal.module.css'
import { useState } from 'react'

type Props = {
    loading: boolean
    error: string | null
    onSubmit: (data: { name: string; description: string; price: number }) => void
}

export const CreateAdvertisementForm = ({ loading, error, onSubmit }: Props) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
    })

    const handleSubmit = () => {
        const price = Number(form.price)

        if (!form.name.trim() || !form.description.trim() || !price) return

        onSubmit({
            name: form.name,
            description: form.description,
            price,
        })
    }

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Новое объявление</h2>

            <div className={styles.field}>
                <span className={styles.label}>Название</span>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className={styles.field}>
                <span className={styles.label}>Описание</span>
                <textarea
                    className={styles.textarea}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                />
            </div>

            <div className={styles.field}>
                <span className={styles.label}>Цена</span>
                <Input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <Button onClick={handleSubmit} disabled={loading} className={styles.button}>
                {loading ? 'Загрузка...' : 'Опубликовать'}
            </Button>
        </div>
    )
}
