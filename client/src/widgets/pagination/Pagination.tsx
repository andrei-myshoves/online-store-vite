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

    return (
        <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1

                return (
                    <Button
                        key={pageNumber}
                        variant={page === pageNumber ? 'primary' : 'outline'}
                        onClick={() => onChange(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                )
            })}
        </div>
    )
}
