type Props = {
    username: string
    avatar?: string | null
    text: string
    date: string
}

export const ReviewItem = ({ username, avatar, text, date }: Props) => {
    return (
        <div className="review-item">
            <div className="review-header">
                <img src={avatar || '/avatar-placeholder.png'} className="review-avatar" />
                <div>
                    <div className="review-username">{username}</div>
                    <div className="review-date">{new Date(date).toLocaleDateString()}</div>
                </div>
            </div>

            <div className="review-text">{text}</div>
        </div>
    )
}
