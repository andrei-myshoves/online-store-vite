import { Modal } from '@/shared/ui/modal'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useState, useEffect } from 'react'
import styles from './CreateAdvertisementModal.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { closeModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { createAdThunk } from '@/store/reducers/createAdvertisement/createAdvertisementThunks'

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
            <div className={styles.container}>
                <h2 className={styles.title}>Новое объявление</h2>

                <Input
                    placeholder="Название"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <textarea
                    className={styles.textarea}
                    placeholder="Описание"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                />

                <Input
                    placeholder="Цена"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                />

                {error && <p className={styles.error}>{error}</p>}

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Загрузка...' : 'Опубликовать'}
                </Button>
            </div>
        </Modal>
    )
}
