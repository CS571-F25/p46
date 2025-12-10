import { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import ScoreDisplay from './ScoreDisplay'
import ChoicesList from './ChoicesList'
import QuizResults from './QuizResults'

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

    return (
        <div className="card quiz-card">
            <div className="card-body" style={{ justifyContent: 'space-between' }}>
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="card-title" style={{ marginBottom: 0, fontSize: '1.3rem' }}>{quiz.title}</h3>
                    </div>

                    <ProgressBar current={completed ? total : current + 1} total={total} />
                    <ScoreDisplay score={score} total={total} />

                    {!completed ? (
                        <div style={{ minHeight: 0 }}>
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
                            <ChoicesList
                                choices={q.choices}
                                selected={selected}
                                correct={q.answerIndex}
                                locked={locked}
                                completed={completed}
                                onSelect={choose}
                            />
                        </div>
                    ) : null}
                </div>

                {completed && (
                    <QuizResults
                        score={score}
                        total={total}
                        onRetry={restart}
                        onBack={onExit}
                    />
                )}
            </div>
        </div>
    )
}
