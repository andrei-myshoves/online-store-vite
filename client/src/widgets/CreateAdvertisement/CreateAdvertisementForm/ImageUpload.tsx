import { useRef } from 'react'
import styles from './ImageUpload.module.css'
import { AddFotoCreateAdverisementIcon } from '@/shared/ui/icons/AddFotoCreateAdvertisementIcon'
import { Button } from '@/shared/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { addImage, removeImage } from '@/store/reducers/createAdvertisement/createAdvertisementSlice'

export const ImageUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()
    const images = useAppSelector(state => state.createAdvertisement.images)

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        files.forEach(file => {
            if (images.length < 5) {
                dispatch(addImage(file))
            }
        })
    }

    const handleRemove = (index: number) => {
        dispatch(removeImage(index))
    }

    const getImageSrc = (file: File | string) => {
        if (typeof file === 'string') return file
        return URL.createObjectURL(file)
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>Фотографии товара (не более 5)</p>

            <div className={styles.grid}>
                {images.map((file, index) => (
                    <div key={index} className={styles.imageItem}>
                        <img src={getImageSrc(file)} alt="" />

                        <Button
                            type="button"
                            variant="wrapper"
                            className={styles.remove}
                            onClick={() => handleRemove(index)}
                        >
                            ✕
                        </Button>
                    </div>
                ))}

                {images.length < 5 && (
                    <div className={styles.placeholder} onClick={() => inputRef.current?.click()}>
                        <AddFotoCreateAdverisementIcon width={30} height={30} />
                    </div>
                )}
            </div>

            <input
                type="file"
                multiple
                accept="image/*"
                ref={inputRef}
                className={styles.input}
                onChange={handleSelect}
            />
        </div>
    )
}
