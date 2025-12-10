export default function QuizResults({ score, total, onRetry, onBack }) {
    const percentage = Math.round((score / total) * 100)

    let message = "Try again!"
    if (percentage === 100) {
        message = "Perfect score! You're a quiz master!"
    } else if (percentage >= 80) {
        message = "Excellent work!"
    } else if (percentage >= 60) {
        message = "Good job!"
    } else if (percentage >= 40) {
        message = "Not bad, keep practicing!"
    }

    return (
        <div className="card quiz-selection" style={{ textAlign: 'center' }}>
            <div className="card-body">
                <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Quiz Complete!</h3>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {percentage === 100 ? '🎉' : '✓'}
                </div>
                <h4 style={{ color: '#667eea', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Your Score: {score}/{total}
                </h4>
                <p style={{ color: '#555', marginBottom: '1.5rem' }}>
                    {percentage}% Correct
                </p>
                <p style={{ color: '#2c3e50', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    {message}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={onRetry} style={{ minWidth: '140px' }}>
                        Retry Quiz
                    </button>
                    <button className="btn btn-outline-secondary" onClick={onBack} style={{ minWidth: '140px' }}>
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    )
}
