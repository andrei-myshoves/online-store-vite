import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import styles from './ReviewForm.module.css'

type Props = {
    loading?: boolean
    error?: string | null
    disabled?: boolean
    onSubmit?: (text: string) => void
}

export const ReviewForm = ({ loading = false, error = null, disabled = false, onSubmit }: Props) => {
    const [text, setText] = useState('')

    const handleSubmit = () => {
        if (!text.trim() || disabled) return
        onSubmit?.(text)
        setText('')
    }

    return (
        <div className={styles.form}>
            <div className={styles.formTitle}>Добавить отзыв</div>

            <textarea
                className={styles.textarea}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Введите отзыв"
                disabled={loading || disabled}
            />

            {error && <div className={styles.error}>{error}</div>}

            <Button className={styles.formButton} onClick={handleSubmit} disabled={!text.trim() || loading || disabled}>
                {loading ? 'Публикация...' : 'Опубликовать'}
            </Button>
        </div>
    )
}
