import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import styles from './CreateAdvertisementForm.module.css'
import clsx from 'clsx'

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
            <div className={styles.field}>
                <label className={styles.label}>Название</label>
                <Input
                    placeholder="Введите название"
                    value={form.name}
                    inputClassName={styles.createInput}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    disabled={loading || disabled}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Описание</label>
                <textarea
                    className={styles.textarea}
                    placeholder="Введите описание"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    disabled={loading || disabled}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Цена</label>
                <Input
                    placeholder="Введите цену"
                    value={form.price}
                    inputClassName={clsx(styles.createInput, styles.smallWidth)}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    disabled={loading || disabled}
                />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <Button
                onClick={handleSubmit}
                disabled={
                    !form.name.trim() || !form.description.trim() || Number(form.price) <= 0 || loading || disabled
                }
                className={styles.saveButton}
            >
                {loading ? 'Публикация...' : 'Опубликовать'}
            </Button>
        </div>
    )
}
