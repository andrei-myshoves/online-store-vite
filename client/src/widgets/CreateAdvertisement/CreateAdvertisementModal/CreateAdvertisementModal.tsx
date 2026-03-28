import { useEffect } from 'react'
import { Modal } from '@/shared/ui/modal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { createAdThunk } from '@/store/reducers/createAdvertisement/createAdvertisementThunks'
import {
    selectCreateAdLoading,
    selectCreateAdError,
    selectCreateAdSuccess,
} from '@/store/reducers/selectors/createAdvertisementSelectors'
import { closeModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { CreateAdvertisementForm } from '../CreateAdvertisementForm/CreateAdvertisementForm'
import styles from './CreateAdvertisementModal.module.css'

export const CreateAdvertisementModal = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector(selectCreateAdLoading)
    const error = useAppSelector(selectCreateAdError)
    const success = useAppSelector(selectCreateAdSuccess)
    const isOpen = useAppSelector(state => state.createAdvertisement.isOpen)

    const handleSubmit = (data: { name: string; description: string; price: number }) => {
        dispatch(
            createAdThunk({
                ...data,
                city: 'Gdańsk',
                images: [],
            })
        )
    }

    useEffect(() => {
        if (success) {
            dispatch(closeModal())
        }
    }, [success, dispatch])

    return (
        <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Новое объявление</h2>

                <CreateAdvertisementForm loading={loading} error={error} onSubmit={handleSubmit} />
            </div>
        </Modal>
    )
}
