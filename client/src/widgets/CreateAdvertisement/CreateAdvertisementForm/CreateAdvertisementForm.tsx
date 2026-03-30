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

type Props = {
    loading?: boolean
    error?: string
    onSubmit?: (data: { name: string; description: string; price: number }) => void
}

export const CreateAdvertisementForm = ({ loading = false, error, onSubmit }: Props) => {
    const dispatch = useAppDispatch()

    const name = useAppSelector(selectCreateAdName)
    const description = useAppSelector(selectCreateAdDescription)
    const priceValue = useAppSelector(selectCreateAdPrice)

    const price = Number(priceValue)

    const isDisabled = !name.trim() || !description.trim() || price <= 0 || loading

    const handleSubmit = () => {
        if (isDisabled) return

        onSubmit?.({
            name,
            description,
            price,
        })
    }

    return (
        <div className={styles.form}>
            <div className={styles.field}>
                <Input
                    label="Название"
                    placeholder="Введите название"
                    value={name}
                    onChange={e => dispatch(setName(e.target.value))}
                    disabled={loading}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Описание</label>
                <textarea
                    className={styles.textarea}
                    placeholder="Введите описание"
                    value={description}
                    onChange={e => dispatch(setDescription(e.target.value))}
                    disabled={loading}
                />
            </div>

            <div className={styles.field}>
                <div className={styles.smallWidth}>
                    <Input
                        label="Цена"
                        placeholder="Введите цену"
                        value={priceValue}
                        onChange={e => dispatch(setPrice(e.target.value))}
                        disabled={loading}
                    />
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <Button onClick={handleSubmit} disabled={isDisabled} className={styles.saveButton}>
                {loading ? 'Публикация...' : 'Опубликовать'}
            </Button>
        </div>
    )
}
