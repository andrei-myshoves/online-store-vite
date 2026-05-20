import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation('reviews')
    const isButtonDisabled = !text.trim() || loading || disabled

    const handleSubmit = () => {
        if (!text.trim() || disabled) return
        onSubmit?.(text)
        setText('')
    }

    return (
        <div className={styles.form}>
            <div className={styles.formTitle}>{t('addReview')}</div>

            <textarea
                className={styles.textarea}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={t('enterReview')}
                disabled={loading || disabled}
            />

            {error && <div className={styles.error}>{error}</div>}

            <Button className={styles.formButton} onClick={handleSubmit} disabled={isButtonDisabled}>
                {loading ? t('publishing') : t('publish')}
            </Button>
        </div>
    )
}
