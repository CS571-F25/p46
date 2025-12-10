export default function QuizCard({ quiz, onTakeQuiz, onDelete, showDelete = false }) {
    const questionCount = quiz.questions.length
    const questionText = questionCount === 1 ? 'question' : 'questions'

    return (
        <div className="card quiz-selection h-100" style={{ cursor: 'pointer', borderLeft: '4px solid #667eea' }}>
            <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h5 className="card-title" style={{ color: '#2c3e50', fontWeight: 600, marginBottom: 0 }}>
                        {quiz.title}
                    </h5>
                    {showDelete && (
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete()
                            }}
                            aria-label="Delete quiz"
                            title="Delete quiz"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                            ✕ Delete
                        </button>
                    )}
                </div>
                <p className="card-text" style={{ color: '#666' }}>
                    {quiz.description}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {questionCount} {questionText}
                </p>
                <button
                    className="btn btn-primary"
                    onClick={onTakeQuiz}
                    aria-label={`Take ${quiz.title} quiz`}
                >
                    Take Quiz
                </button>
            </div>
        </div>
    )
}
