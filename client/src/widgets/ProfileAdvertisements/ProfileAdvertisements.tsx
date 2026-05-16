import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { AdvertisementsList } from '@/widgets/AdvertisementsList/AdvertisementsList'
import { fetchProfileAdvertisements } from '@/store/reducers/profileAdvertisements/profileAdvertisementsThunks'
import {
    selectProfileAdvertisementsItems,
    selectProfileAdvertisementsLoading,
    selectProfileAdvertisementsError,
    selectProfileAdvertisementsTotal,
} from '@/store/reducers/selectors/profileAdvertisementsSelectors'
import { Pagination } from '@/widgets/pagination/Pagination'
import styles from './ProfileAdvertisements.module.css'

type Props = {
    userId: number
}

const LIMIT = 8

export const ProfileAdvertisements = ({ userId }: Props) => {
    const dispatch = useAppDispatch()

    const items = useAppSelector(selectProfileAdvertisementsItems)
    const loading = useAppSelector(selectProfileAdvertisementsLoading)
    const error = useAppSelector(selectProfileAdvertisementsError)
    const total = useAppSelector(selectProfileAdvertisementsTotal)

    const [page, setPage] = useState(1)
    const { t } = useTranslation('profile')

    useEffect(() => {
        if (userId) {
            dispatch(
                fetchProfileAdvertisements({
                    userId,
                    limit: 8,
                    offset: (page - 1) * 8,
                })
            )
        }
    }, [dispatch, userId, page])

    return (
        <>
            <AdvertisementsList
                className={styles.profileList}
                gridClassName={styles.profileGrid}
                title={t('myProducts')}
                items={items}
                loading={loading}
                error={error}
            />

            {total > LIMIT && <Pagination page={page} total={total} limit={LIMIT} onChange={setPage} />}
        </>
    )
}
