export default function AnswerChoice({ choice, index, isSelected, isCorrect, isWrong, locked, completed, onSelect }) {
    let backgroundColor = 'white'
    let borderColor = '#999'

    if (isSelected && isWrong) {
        backgroundColor = '#ffebee'
        borderColor = '#c62828'
    } else if (isCorrect && (locked || completed)) {
        backgroundColor = '#e8f5e9'
        borderColor = '#2e7d32'
    } else if (isSelected) {
        backgroundColor = '#f0f0f0'
        borderColor = '#667eea'
    }

    return (
        <button
            className="list-group-item list-group-item-action"
            onClick={() => onSelect(index)}
            disabled={locked || completed}
            style={{
                backgroundColor,
                borderColor,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '8px',
                cursor: locked || completed ? 'default' : 'pointer',
                padding: '1rem',
                marginBottom: '0.75rem',
                textAlign: 'left',
                color: '#2c3e50',
                fontWeight: 500,
                transition: 'all 200ms ease'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{choice}</span>
                {isCorrect && (locked || completed) && <span style={{ color: '#2e7d32', fontSize: '1.2rem' }}>✓</span>}
                {isWrong && <span style={{ color: '#c62828', fontSize: '1.2rem' }}>✗</span>}
            </div>
        </button>
    )
}
