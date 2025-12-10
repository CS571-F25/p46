export default function AnswerChoice({ choice, index, isSelected, isCorrect, isWrong, locked, completed, onSelect }) {
    // Determine styling based on state
    const getBackgroundColor = () => {
        if (isSelected && isWrong) return '#ffebee'
        if (isCorrect && (locked || completed)) return '#e8f5e9'
        if (isSelected) return '#f0f0f0'
        return 'white'
    }

    const getBorderColor = () => {
        if (isSelected && isWrong) return '#c62828'
        if (isCorrect && (locked || completed)) return '#2e7d32'
        if (isSelected) return '#667eea'
        return '#999'
    }

    const isDisabled = locked || completed

    return (
        <button
            className="list-group-item list-group-item-action"
            onClick={() => onSelect(index)}
            disabled={isDisabled}
            style={{
                backgroundColor: getBackgroundColor(),
                borderColor: getBorderColor(),
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '8px',
                cursor: isDisabled ? 'default' : 'pointer',
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
                {isCorrect && isDisabled && <span style={{ color: '#2e7d32', fontSize: '1.2rem' }}>✓</span>}
                {isWrong && <span style={{ color: '#c62828', fontSize: '1.2rem' }}>✗</span>}
            </div>
        </button>
    )
}
