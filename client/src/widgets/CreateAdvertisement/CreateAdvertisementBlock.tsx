import { useNavigate } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { createAdThunk } from '@/store/reducers/createAdvertisement/createAdvertisementThunks'
import { Button } from '@/shared/ui/button'
import { LeftArrow } from '@/shared/ui/icons/LeftArrow'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
import styles from './CreateAdvertisementBlock.module.css'
import { CreateAdvertisementForm } from './CreateAdvertisementForm/CreateAdvertisementForm'

type Props = {
    onClose?: () => void
}

export const CreateAdvertisementBlock = ({ onClose }: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { loading, error } = useAppSelector(state => state.createAdvertisement)

    const handleBack = () => {
        if (onClose) onClose()
        else navigate({ to: '/' })
    }

    const handleSubmit = async (data: { name: string; description: string; price: number }) => {
        const result = await dispatch(
            createAdThunk({
                ...data,
                city: 'Gdańsk',
                images: [],
            })
        )

        if (createAdThunk.fulfilled.match(result)) {
            if (onClose) onClose()
            else navigate({ to: '/' })
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerTop}>
                <Button variant="wrapper" onClick={handleBack}>
                    <LeftArrow width={16} height={16} />
                </Button>

                <h2 className={styles.title}>Новое объявление</h2>

                {onClose && (
                    <Button variant="wrapper" onClick={onClose}>
                        <CloseIcon width={20} height={20} />
                    </Button>
                )}
            </div>

            <CreateAdvertisementForm loading={loading} error={error} onSubmit={handleSubmit} />
        </div>
    )
}
