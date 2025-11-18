import { useState, useEffect } from 'react'

export default function QuizView({ quiz, onExit }) {
    const quizStorageKey = `quiz_${quiz.id}`

    const [current, setCurrent] = useState(() => {
        const saved = sessionStorage.getItem(`${quizStorageKey}_current`)
        return saved ? parseInt(saved) : 0
    })
    const [score, setScore] = useState(() => {
        const saved = sessionStorage.getItem(`${quizStorageKey}_score`)
        return saved ? parseInt(saved) : 0
    })
    const [selected, setSelected] = useState(null)
    const [locked, setLocked] = useState(false)
    const [completed, setCompleted] = useState(() => {
        const saved = sessionStorage.getItem(`${quizStorageKey}_completed`)
        return saved === 'true'
    })

    useEffect(() => {
        sessionStorage.setItem(`${quizStorageKey}_current`, current.toString())
        sessionStorage.setItem(`${quizStorageKey}_score`, score.toString())
        sessionStorage.setItem(`${quizStorageKey}_completed`, completed.toString())
    }, [current, score, completed, quizStorageKey])

    const total = quiz.questions.length

    function choose(index) {
        if (locked || completed) return
        setSelected(index)
        setLocked(true)
        const correct = quiz.questions[current].answerIndex === index
        if (correct) {
            setScore(s => s + 1)
        }
        // brief pause before moving to next question
        setTimeout(() => {
            const next = current + 1
            if (next >= total) {
                setCompleted(true)
                setLocked(false)
            } else {
                setCurrent(next)
                setSelected(null)
                setLocked(false)
            }
        }, 1200)
    }

    function restart() {
        setCurrent(0)
        setScore(0)
        setSelected(null)
        setLocked(false)
        setCompleted(false)
        sessionStorage.removeItem(`${quizStorageKey}_current`)
        sessionStorage.removeItem(`${quizStorageKey}_score`)
        sessionStorage.removeItem(`${quizStorageKey}_completed`)
    }

    const q = quiz.questions[current]

    const percent = Math.round(((completed ? total : current) / total) * 100)

    return (
        <div className="card quiz-card">
            <div className="card-body" style={{ justifyContent: 'space-between' }}>
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h4 className="card-title" style={{ marginBottom: 0, fontSize: '1.3rem' }}>{quiz.title}</h4>
                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>Score: {score}/{total}</div>
                    </div>

                    <div className="mb-2">
                        <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    {!completed ? (
                        <div style={{ minHeight: 0 }}>
                            <h5 className="mb-2" style={{ fontSize: '1rem' }}>Question {current + 1} of {total}</h5>
                            <p className="lead" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{q.text}</p>
                            <div className="alert-container">
                                {selected !== null && selected !== q.answerIndex && (
                                    <div className="alert alert-danger mb-0" role="alert">
                                        <strong>Incorrect!</strong> The correct answer is: <strong>{q.choices[q.answerIndex]}</strong>
                                    </div>
                                )}
                                {selected !== null && selected === q.answerIndex && (
                                    <div className="alert alert-success mb-0" role="alert">
                                        <strong>Correct!</strong> Great job!
                                    </div>
                                )}
                            </div>
                            <div className="list-group">
                                {q.choices.map((choice, i) => {
                                    const isSelected = selected === i
                                    const isCorrect = q.answerIndex === i
                                    let className = 'list-group-item list-group-item-action'
                                    return (
                                        <button key={i} disabled={locked} onClick={() => choose(i)} className={className} style={{ textAlign: 'left' }}>
                                            {choice}
                                            {selected !== null && isCorrect && ' ✓'}
                                            {selected !== null && isSelected && !isCorrect && ' ✗'}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>

                {completed ? (
                    <div className="text-center">
                        <h3>Your score: {score} / {total}</h3>
                        <p className="mb-3">{score === total ? 'Perfect! Great job.' : score >= total / 2 ? 'Nice work — you passed!' : 'Keep studying — you can do better next time.'}</p>
                        <button className="btn btn-primary me-2" onClick={restart}>Retry</button>
                        <button className="btn btn-outline-secondary" onClick={onExit}>Back to list</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
