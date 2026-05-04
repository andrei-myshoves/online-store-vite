import { useNavigate } from '@tanstack/react-router'
import { BrandIcon } from '@/shared/ui/icons/BrandIcon'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import styles from './AdvertisementTopBar.module.css'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setQuery } from '@/store/reducers/search/searchSlice'
import { selectSearchQuery } from '@/store/reducers/selectors/searchSelectors'

interface Props {
    showBackButton?: boolean
    showSearch?: boolean
}

export const AdvertisementTopBar = ({ showBackButton = true, showSearch = false }: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectSearchQuery)

    const handleBack = () => {
        navigate({ to: '/' })
    }

    return (
        <div className={styles.wrapper}>
            <BrandIcon width={55} height={38} />

            {showSearch && (
                <Input
                    className={styles.search}
                    placeholder="Поиск"
                    value={query}
                    onChange={e => dispatch(setQuery(e.target.value))}
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
