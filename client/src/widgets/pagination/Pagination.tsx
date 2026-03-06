import styles from './Pagination.module.css'
import { Button } from '@/shared/ui/button/Button'

type Props = {
    page: number
    total: number
    limit: number
    onChange: (page: number) => void
}

export const Pagination = ({ page, total, limit, onChange }: Props) => {
    const totalPages = Math.ceil(total / limit)

    if (totalPages <= 1) return null

    const visiblePages = 5

    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, start + visiblePages - 1)

    const pages = []

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            {page > 1 && (
                <Button className={styles.pageButton} variant="outline" onClick={() => onChange(page - 1)}>
                    ←
                </Button>
            )}

            {pages.map(p => (
                <Button
                    key={p}
                    className={styles.pageButton}
                    variant={p === page ? 'primary' : 'outline'}
                    onClick={() => onChange(p)}
                >
                    {p}
                </Button>
            ))}

            {page < totalPages && (
                <Button className={styles.pageButton} variant="outline" onClick={() => onChange(page + 1)}>
                    →
                </Button>
            )}
        </div>
    )
}
