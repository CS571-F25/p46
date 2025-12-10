export default function EmptyState({ description, buttonText, buttonHref }) {
    return (
        <div className="card quiz-selection">
            <div className="card-body text-center">
                <p style={{ color: '#555', marginBottom: '1.5rem' }}>
                    {description}
                </p>
                <a href={buttonHref} className="btn btn-primary">
                    {buttonText}
                </a>
            </div>
        </div>
    )
}
