import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setName, setDescription, setPrice } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import {
    selectCreateAdName,
    selectCreateAdDescription,
    selectCreateAdPrice,
} from '@/store/reducers/selectors/createAdvertisementSelectors'
import styles from './CreateAdvertisementForm.module.css'
import { ImageUpload } from '../CreateAdvertisementForm/ImageUpload'

export type CreateAdFormData = {
    name: string
    description: string
    price: number
    images: (File | string)[]
}

type Props = {
    loading?: boolean
    error?: string
    mode?: 'create' | 'edit'
    onSubmit?: (data: CreateAdFormData) => void
}

export const CreateAdvertisementForm = ({ loading = false, mode = 'create', error, onSubmit }: Props) => {
    const dispatch = useAppDispatch()
    const images = useAppSelector(state => state.createAdvertisement.images)

    const name = useAppSelector(selectCreateAdName)
    const description = useAppSelector(selectCreateAdDescription)
    const priceValue = useAppSelector(selectCreateAdPrice)
    const { t } = useTranslation('advertisement')

    const price = Number(priceValue)
    const isCreateMode = mode === 'create'

    const isDisabled = !name.trim() || !description.trim() || price <= 0 || loading

    const handleSubmit = () => {
        if (isDisabled) return

        onSubmit?.({
            name,
            description,
            price,
            images,
        })
    }

    return (
        <div className={styles.form}>
            <div className={styles.field}>
                <Input
                    label={t('title')}
                    placeholder={t('enterTitle')}
                    value={name}
                    onChange={e => dispatch(setName(e.target.value))}
                    disabled={loading}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>{t('descriptionLabel')}</label>
                <textarea
                    className={styles.textarea}
                    placeholder={t('enterDescription')}
                    value={description}
                    onChange={e => dispatch(setDescription(e.target.value))}
                    disabled={loading}
                />
            </div>
            <ImageUpload />
            <div className={styles.field}>
                <div className={styles.inputWrapper}>
                    <Input
                        label={t('price')}
                        placeholder={t('enterPrice')}
                        value={priceValue}
                        onChange={e => dispatch(setPrice(e.target.value))}
                        disabled={loading}
                        className={styles.inputWithIcon}
                    />

                    <div className={styles.icon}>
                        <span className={styles.ruble}>{t('priceCurrency')}</span>
                    </div>
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}

            <Button onClick={handleSubmit} disabled={isDisabled} className={styles.saveButton}>
                {loading ? (isCreateMode ? t('publishing') : t('saving')) : isCreateMode ? t('publish') : t('save')}
            </Button>
        </div>
    )
}
