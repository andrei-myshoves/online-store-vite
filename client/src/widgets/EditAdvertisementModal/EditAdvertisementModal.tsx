import { Modal } from '@/shared/ui/modal'
import { useAppDispatch } from '@/hooks/redux'
import { closeModal, setFormData } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'
import { CreateAdvertisementForm } from '@/widgets/CreateAdvertisement/CreateAdvertisementForm/CreateAdvertisementForm'
import { useEffect } from 'react'
import { updateAdvertisementThunk } from '@/store/reducers/advertisement/advertisementThunks'
import { fetchAdvertisementById } from '@/store/reducers/advertisement/advertisementThunks'

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
        <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
            <CreateAdvertisementForm onSubmit={handleSubmit} loading={false} error={undefined} />
        </Modal>
    )
}
