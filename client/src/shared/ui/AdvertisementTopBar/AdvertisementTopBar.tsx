import { useNavigate } from '@tanstack/react-router'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import styles from './AdvertisementTopBar.module.css'

import { useAppSelector } from '@/hooks/redux'
import { selectSearchQuery } from '@/store/reducers/selectors/searchSelectors'

interface Props {
    showBackButton?: boolean
    showSearch?: boolean
    onSearchChange?: (value: string) => void
}

export const AdvertisementTopBar = ({ showBackButton = true, showSearch = false, onSearchChange }: Props) => {
    const navigate = useNavigate()
    const query = useAppSelector(selectSearchQuery)

    const handleBack = () => {
        navigate({ to: '/' })
    }

    return (
        <div className={styles.wrapper}>
            <BrandIcon width={55} height={38} />

            {showSearch && (
                <Input
                    variant="outline"
                    className={styles.search}
                    placeholder="Поиск по объявлениям"
                    value={query}
                    onChange={e => onSearchChange?.(e.target.value)}
                />
            )}

            {showBackButton && (
                <Button onClick={handleBack} className={styles.backButton}>
                    Вернуться на главную
                </Button>
            )}
        </div>
    )
}
