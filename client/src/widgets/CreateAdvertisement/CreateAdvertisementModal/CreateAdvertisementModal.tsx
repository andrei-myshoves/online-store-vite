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
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { Button } from '@/shared/ui/button'

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
                <div className={styles.headerTop}>
                    <Button variant="wrapper" className={styles.backButton} onClick={() => dispatch(closeModal())}>
                        <LeftArrow width={16} height={16} />
                    </Button>

                    <h2 className={styles.title}>Новое объявление</h2>

                    <Button variant="wrapper" className={styles.closeButton} onClick={() => dispatch(closeModal())}>
                        <CloseIcon width={30} height={30} />
                    </Button>
                </div>

                <CreateAdvertisementForm loading={loading} error={error} onSubmit={handleSubmit} />
            </div>
        </Modal>
    )
}
