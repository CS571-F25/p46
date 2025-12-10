export default function QuestionSelector({ questions, expanded, onSelect }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {questions.map((q, qIndex) => {
                const isExpanded = expanded === qIndex
                return (
                    <button
                        key={`question-${qIndex}`}
                        onClick={() => onSelect(qIndex)}
                        className="btn"
                        aria-pressed={isExpanded}
                        aria-label={`Question ${qIndex + 1}${isExpanded ? ' (selected)' : ''}`}
                        style={{
                            background: isExpanded ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0',
                            color: isExpanded ? 'white' : '#2c3e50',
                            border: 'none',
                            padding: '0.75rem',
                            textAlign: 'left',
                            borderRadius: '8px',
                            fontWeight: isExpanded ? 600 : 500,
                            transition: 'all 200ms ease'
                        }}
                    >
                        Q{qIndex + 1}
                    </button>
                )
            })}
        </div>
    )
}
