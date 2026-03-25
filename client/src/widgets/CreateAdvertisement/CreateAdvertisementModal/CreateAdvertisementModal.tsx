import { Modal } from '@/shared/ui/modal'
import { CreateAdvertisementBlock } from '../CreateAdvertisementBlock'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { closeModal } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'

export const CreateAdvertisementModal = () => {
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(state => state.createAdvertisement)

    return (
        <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
            <CreateAdvertisementBlock onClose={() => dispatch(closeModal())} />
        </Modal>
    )
}
