import { Modal } from '@/shared/ui/modal'
import { useAppDispatch } from '@/hooks/redux'
import { setFormData } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { CreateAdvertisementForm } from '@/widgets/CreateAdvertisement/CreateAdvertisementForm/CreateAdvertisementForm'
import { useEffect } from 'react'
import { updateAdvertisementThunk, fetchAdvertisementById } from '@/store/reducers/advertisement/advertisementThunks'

import styles from '@/widgets/EditAdvertisementModal/EditAdvertisementModal.module.css'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { Button } from '@/shared/ui/button'

type Props = {
    isOpen: boolean
    onClose: () => void
    advertisement: any
}

export const EditAdvertisementModal = ({ isOpen, onClose, advertisement }: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (advertisement) {
            dispatch(
                setFormData({
                    name: advertisement.name,
                    description: advertisement.description,
                    price: advertisement.price,
                })
            )
        }
    }, [advertisement, dispatch])

    const handleSubmit = async (data: any) => {
        const result = await dispatch(
            updateAdvertisementThunk({
                id: advertisement.id,
                ...data,
            })
        )

        if (updateAdvertisementThunk.fulfilled.match(result)) {
            dispatch(fetchAdvertisementById(advertisement.id))
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.wrapper}>
                <div className={styles.headerTop}>
                    <Button variant="wrapper" className={styles.backButton} onClick={onClose}>
                        <LeftArrow width={16} height={16} />
                    </Button>

                    <h2 className={styles.title}>
                        <span className={styles.mobileTitle}>Редактировать</span>
                        <span className={styles.desktopTitle}>Редактировать объявление</span>
                    </h2>

                    <Button variant="wrapper" className={styles.closeButton} onClick={onClose}>
                        <CloseIcon width={30} height={30} />
                    </Button>
                </div>

                <CreateAdvertisementForm onSubmit={handleSubmit} mode="edit" />
            </div>
        </Modal>
    )
}
