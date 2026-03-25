import { Modal } from '@/shared/ui/modal'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useState, useEffect } from 'react'
import styles from './CreateAdvertisementModal.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { closeModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { createAdThunk } from '@/store/reducers/createAdvertisement/createAdvertisementThunks'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'

export const CreateAdvertisementModal = () => {
    const dispatch = useAppDispatch()

    const { isOpen, loading, error } = useAppSelector(state => state.createAdvertisement)

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
    })

    useEffect(() => {
        if (!isOpen) {
            setForm({
                name: '',
                description: '',
                price: '',
            })
        }
    }, [isOpen])

    const handleSubmit = () => {
        const price = Number(form.price)

        if (!form.name.trim() || !form.description.trim() || !price) return

        dispatch(
            createAdThunk({
                name: form.name,
                description: form.description,
                price,
                city: 'Gdańsk',
                images: [],
            })
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => dispatch(closeModal())}>
                        <LeftArrow width={16} height={16} />
                    </button>

                    <h2 className={styles.title}>Новое объявление</h2>
                </div>

                <button className={styles.closeButton} onClick={() => dispatch(closeModal())}>
                    <CloseIcon width={20} height={20} />
                </button>

                <div className={styles.field}>
                    <span className={styles.label}>Название</span>
                    <Input
                        placeholder="Введите название"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div className={styles.field}>
                    <span className={styles.label}>Описание</span>
                    <textarea
                        className={styles.textarea}
                        placeholder="Введите описание"
                        value={form.description}
                        onChange={e =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                    />
                </div>

                <div className={styles.field}>
                    <span className={styles.label}>Цена</span>
                    <Input
                        placeholder="Введите цену"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <Button onClick={handleSubmit} disabled={loading} className={styles.button}>
                    {loading ? 'Загрузка...' : 'Опубликовать'}
                </Button>
            </div>
        </Modal>
    )
}
