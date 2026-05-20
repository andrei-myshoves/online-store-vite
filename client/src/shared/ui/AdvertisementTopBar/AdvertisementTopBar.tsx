import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import styles from './AdvertisementTopBar.module.css'
import { useCatalogPageSearch } from '@/hooks/useCatalogPageSearch'
import { useTranslation } from 'react-i18next'

interface Props {
    showBackButton?: boolean
    showSearch?: boolean
    searchValue?: string
    onSearchChange?: (value: string) => void
}

export const AdvertisementTopBar = ({
    showBackButton = true,
    showSearch = false,
    onSearchChange,
    searchValue,
}: Props) => {
    const navigateCatalog = useCatalogPageSearch()

    const { t } = useTranslation('common')
    const handleBack = () => {
        navigateCatalog()
    }

    return (
        <div className={styles.wrapper}>
            <BrandIcon width={55} height={38} />

            {showSearch && (
                <Input
                    variant="outline"
                    className={styles.search}
                    placeholder="Поиск по объявлениям"
                    value={searchValue || ''}
                    onChange={e => onSearchChange?.(e.target.value)}
                />
            )}

            {showBackButton && (
                <Button onClick={handleBack} className={styles.backButton}>
                    {t('backToHome')}
                </Button>
            )}
        </div>
    )
}
