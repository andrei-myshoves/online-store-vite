import { useParams } from '@tanstack/react-router'
import { ReviewsBlock } from '@/widgets/reviews/ReviewsBlock'

export const ReviewsPage = () => {
    const { slug } = useParams({ from: '/reviews/$slug' })

    return (
        <div style={{ padding: 24 }}>
            <ReviewsBlock slug={slug} />
        </div>
    )
}
