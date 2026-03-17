import { useEffect, useState } from 'react'
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
    }, [userId, page])

    return (
        <>
            <AdvertisementsList
                className={styles.profileList}
                gridClassName={styles.profileGrid}
                title="Мои товары"
                items={items}
                loading={loading}
                error={error}
            />

            {total > LIMIT && <Pagination page={page} total={total} limit={LIMIT} onChange={setPage} />}
        </>
    )
}
