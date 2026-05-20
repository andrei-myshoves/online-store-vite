import { Modal } from '@/shared/ui/modal'
import { useAppDispatch } from '@/hooks/redux'
import { setFormData, setImages } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { CreateAdvertisementForm } from '@/widgets/CreateAdvertisement/CreateAdvertisementForm/CreateAdvertisementForm'
import { useEffect } from 'react'
import { updateAdvertisementThunk, fetchAdvertisementById } from '@/store/reducers/advertisement/advertisementThunks'
import { useTranslation } from 'react-i18next'
import styles from '@/widgets/EditAdvertisementModal/EditAdvertisementModal.module.css'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { Button } from '@/shared/ui/button'
import type { Advertisement } from '@/entities/advertisement/models/types'
import type { CreateAdFormData } from '@/widgets/CreateAdvertisement/CreateAdvertisementForm/CreateAdvertisementForm'

type Props = {
    isOpen: boolean
    onClose: () => void
    advertisement: Advertisement
}

export const EditAdvertisementModal = ({ isOpen, onClose, advertisement }: Props) => {
    const dispatch = useAppDispatch()

    const { t } = useTranslation('advertisement')

    useEffect(() => {
        if (advertisement) {
            dispatch(
                setFormData({
                    name: advertisement.name,
                    description: advertisement.description,
                    price: String(advertisement.price),
                })
            )
            dispatch(setImages(advertisement.images || []))
        }
    }, [advertisement, dispatch])

    const handleSubmit = async (data: CreateAdFormData) => {
        const result = await dispatch(
            updateAdvertisementThunk({
                id: advertisement.id,
                ...data,
            })
        )

        if (updateAdvertisementThunk.fulfilled.match(result)) {
            dispatch(fetchAdvertisementById(String(advertisement.id)))
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
                        <span className={styles.mobileTitle}>{t('editShort')}</span>
                        <span className={styles.desktopTitle}>{t('editAdvertisement')}</span>
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
