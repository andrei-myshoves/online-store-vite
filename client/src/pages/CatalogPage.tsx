import { useEffect, useState } from 'react'
import styles from './CatalogPage.module.css'

type Advertisement = {
    id: number
    name: string
    price: number
    images?: string[]
}

export const CatalogPage = () => {
    const [items, setItems] = useState<Advertisement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/advertisement')
            .then(res => res.json())
            .then(data => {
                setItems(data.items)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Объявления</h1>

            <div className={styles.grid}>
                {items.map(item => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.image}>
                            <img src={item.images?.[0] ?? '/placeholder.png'} alt={item.name} />
                        </div>

                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.price}>{item.price} ₽</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
