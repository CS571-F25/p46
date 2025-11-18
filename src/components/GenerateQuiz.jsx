import { useState } from 'react'

export default function GenerateQuiz() {
    const [quizTitle, setQuizTitle] = useState('')
    const [quizDescription, setQuizDescription] = useState('')
    const [questions, setQuestions] = useState([
        { text: '', choices: ['', '', '', ''], answerIndex: 0 }
    ])
    const [expandedQuestion, setExpandedQuestion] = useState(0)

    const addQuestion = () => {
        setQuestions([...questions, { text: '', choices: ['', '', '', ''], answerIndex: 0 }])
        setExpandedQuestion(questions.length)
    }

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index))
        if (expandedQuestion === index && index > 0) {
            setExpandedQuestion(index - 1)
        }
    }

    const updateQuestion = (index, field, value) => {
        const updated = [...questions]
        updated[index][field] = value
        setQuestions(updated)
    }

    const updateChoice = (qIndex, cIndex, value) => {
        const updated = [...questions]
        updated[qIndex].choices[cIndex] = value
        setQuestions(updated)
    }

    return (
        <div>
            <h2 className="mb-4">Create Your Own Quiz</h2>

            <div className="card quiz-selection mb-4">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Quiz Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder="Enter quiz title"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quiz Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                            placeholder="Enter quiz description"
                        />
                    </div>
                </div>
            </div>

            <h5 className="mb-3" style={{ color: '#2c3e50', fontWeight: 600 }}>Questions ({questions.length})</h5>

            <div className="row" style={{ alignItems: 'flex-start' }}>
                <div className="col-md-3 mb-3">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {questions.map((q, qIndex) => (
                            <button
                                key={qIndex}
                                onClick={() => setExpandedQuestion(qIndex)}
                                className="btn"
                                style={{
                                    background: expandedQuestion === qIndex ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0',
                                    color: expandedQuestion === qIndex ? 'white' : '#2c3e50',
                                    border: 'none',
                                    padding: '0.75rem',
                                    textAlign: 'left',
                                    borderRadius: '8px',
                                    fontWeight: expandedQuestion === qIndex ? 600 : 500,
                                    transition: 'all 200ms ease'
                                }}
                            >
                                Q{qIndex + 1}
                            </button>
                        ))}
                        <button className="btn btn-primary mt-2" onClick={addQuestion}>
                            + Add Question
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="card quiz-selection" style={{ marginTop: 0 }}>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Question {expandedQuestion + 1}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={questions[expandedQuestion].text}
                                    onChange={(e) => updateQuestion(expandedQuestion, 'text', e.target.value)}
                                    placeholder="Enter question text"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Answer Choices</label>
                                {questions[expandedQuestion].choices.map((choice, cIndex) => (
                                    <div key={cIndex} className="mb-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={choice}
                                                onChange={(e) => updateChoice(expandedQuestion, cIndex, e.target.value)}
                                                placeholder={`Choice ${cIndex + 1}`}
                                            />
                                            <div className="input-group-text">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name={`correct-${expandedQuestion}`}
                                                    checked={questions[expandedQuestion].answerIndex === cIndex}
                                                    onChange={() => updateQuestion(expandedQuestion, 'answerIndex', cIndex)}
                                                    title="Mark as correct answer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {questions.length > 1 && (
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => removeQuestion(expandedQuestion)}
                                >
                                    Remove Question
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-end">
                <button className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
                    Submit Quiz
                </button>
                <span style={{ fontSize: '0.85rem', color: '#999', marginLeft: '0.5rem' }}>
                    (Not functional yet)
                </span>
            </div>
        </div>
    )
}
