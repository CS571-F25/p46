export default function QuestionSelector({ questions, expanded, onSelect }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {questions.map((q, qIndex) => (
                <button
                    key={qIndex}
                    onClick={() => onSelect(qIndex)}
                    className="btn"
                    style={{
                        background: expanded === qIndex ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0',
                        color: expanded === qIndex ? 'white' : '#2c3e50',
                        border: 'none',
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        fontWeight: expanded === qIndex ? 600 : 500,
                        transition: 'all 200ms ease'
                    }}
                >
                    Q{qIndex + 1}
                </button>
            ))}
        </div>
    )
}
