import { Modal } from '@/shared/ui/modal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { createAdThunk } from '@/store/reducers/createAdvertisement/createAdvertisementThunks'
import { fetchProfileAdvertisements } from '@/store/reducers/profileAdvertisements/profileAdvertisementsThunks'
import {
    selectCreateAdLoading,
    selectCreateAdError,
    selectCreateAdIsModalOpen,
} from '@/store/reducers/selectors/createAdvertisementSelectors'
import { closeModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { CreateAdvertisementForm } from '../CreateAdvertisementForm/CreateAdvertisementForm'
import styles from './CreateAdvertisementModal.module.css'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { Button } from '@/shared/ui/button'
import type { CreateAdFormData } from '@/widgets/CreateAdvertisement/CreateAdvertisementForm/CreateAdvertisementForm'
import { useTranslation } from 'react-i18next'

const CreateAdvertisementModal = () => {
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.auth.user?.id)

    const loading = useAppSelector(selectCreateAdLoading)
    const error = useAppSelector(selectCreateAdError)
    const isOpen = useAppSelector(selectCreateAdIsModalOpen)

    const { t } = useTranslation('advertisement')

    const handleSubmit = async (data: CreateAdFormData) => {
        const onlyFiles = data.images.filter((img): img is File => img instanceof File)

        const result = await dispatch(
            createAdThunk({
                ...data,
                city: 'Gdańsk',
                images: onlyFiles,
            })
        )

        if (createAdThunk.fulfilled.match(result) && userId) {
            dispatch(
                fetchProfileAdvertisements({
                    userId,
                    limit: 8,
                    offset: 0,
                })
            )
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
            <div className={styles.wrapper}>
                <div className={styles.headerTop}>
                    <Button variant="wrapper" className={styles.backButton} onClick={() => dispatch(closeModal())}>
                        <LeftArrow width={16} height={16} />
                    </Button>

                    <h2 className={styles.title}>{t('newAdvertisement')}</h2>

                    <Button variant="wrapper" className={styles.closeButton} onClick={() => dispatch(closeModal())}>
                        <CloseIcon width={30} height={30} />
                    </Button>
                </div>

                <CreateAdvertisementForm loading={loading} error={error} onSubmit={handleSubmit} />
            </div>
        </Modal>
    )
}

export default CreateAdvertisementModal
