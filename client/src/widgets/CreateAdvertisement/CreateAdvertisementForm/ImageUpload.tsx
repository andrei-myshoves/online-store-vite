import { useRef } from 'react'
import styles from './ImageUpload.module.css'

type Props = {
    images: File[]
    setImages: (files: File[]) => void
}

export const ImageUpload = ({ images, setImages }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        const newImages = [...images, ...files].slice(0, 5)

        setImages(newImages)
    }

    const handleRemove = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        setImages(newImages)
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>Фотографии товара (не более 5)</p>

            <div className={styles.grid}>
                {images.map((file, index) => (
                    <div key={index} className={styles.imageItem}>
                        <img src={URL.createObjectURL(file)} alt="" />

                        <button className={styles.remove} onClick={() => handleRemove(index)}>
                            ✕
                        </button>
                    </div>
                ))}

                {images.length < 5 && (
                    <div className={styles.placeholder} onClick={() => inputRef.current?.click()}>
                        +
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
