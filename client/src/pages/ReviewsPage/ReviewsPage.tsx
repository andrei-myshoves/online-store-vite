import { useParams } from '@tanstack/react-router'
import { ReviewsBlock } from '@/widgets/reviews/ReviewsBlock'

export const ReviewsPage = () => {
    const { id } = useParams({ from: '/reviews/$id' })

    return (
        <div style={{ padding: 24 }}>
            <ReviewsBlock id={Number(id)} />
        </div>
    )
}
