export default function ProgressBar({ current, total }) {
    const percentage = Math.round((current / total) * 100)

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.9rem', color: '#444' }}>
                <span>Question {current} of {total}</span>
                <span>{percentage}%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
                <div
                    className="progress-bar"
                    style={{
                        width: `${percentage}%`,
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        transition: 'width 0.3s ease'
                    }}
                />
            </div>
        </div>
    )
}
