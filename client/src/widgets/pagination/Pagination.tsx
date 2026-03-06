import { useMemo } from 'react'
import styles from './Pagination.module.css'
import { Button } from '@/shared/ui/button/Button'

type Props = {
    page: number
    total: number
    limit: number
    onChange: (page: number) => void
}

const VISIBLE_PAGES = 5

export const Pagination = ({ page, total, limit, onChange }: Props) => {
    const totalPages = Math.ceil(total / limit)

    const pages = useMemo(() => {
        if (totalPages <= 1) return []

        const start = Math.max(1, page - 2)
        const end = Math.min(totalPages, start + VISIBLE_PAGES - 1)

        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }, [page, totalPages])

    if (totalPages <= 1) return null

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
                    variant={page === p ? 'primary' : 'outline'}
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
