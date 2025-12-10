import { useState, useEffect } from 'react'
import QuizView from './QuizView'
import QuizCard from './QuizCard'
import EmptyState from './EmptyState'

export default function CustomQuizzes() {
    const [customQuizzes, setCustomQuizzes] = useState([])
    const [selectedQuizId, setSelectedQuizId] = useState(() => {
        return sessionStorage.getItem('activeCustomQuizId') || null
    })

    useEffect(() => {
        const saved = JSON.parse(sessionStorage.getItem('customQuizzes')) || []
        setCustomQuizzes(saved)
    }, [])

    useEffect(() => {
        if (selectedQuizId) {
            sessionStorage.setItem('activeCustomQuizId', selectedQuizId)
        } else {
            sessionStorage.removeItem('activeCustomQuizId')
        }
    }, [selectedQuizId])

    const selectedQuiz = customQuizzes.find(q => q.id === selectedQuizId)

    const deleteQuiz = (quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz? This cannot be undone.')) {
            const updated = customQuizzes.filter(q => q.id !== quizId)
            setCustomQuizzes(updated)
            sessionStorage.setItem('customQuizzes', JSON.stringify(updated))
            // If deleted quiz was active, clear it
            if (selectedQuizId === quizId) {
                setSelectedQuizId(null)
            }
        }
    }

    if (selectedQuiz) {
        return <QuizView quiz={selectedQuiz} onExit={() => setSelectedQuizId(null)} />
    }

    return (
        <div>
            <h2 className="mb-4">Your Custom Quizzes</h2>

            {customQuizzes.length === 0 ? (
                <EmptyState
                    description="You haven't created any quizzes yet."
                    buttonText="Create Your First Quiz"
                    buttonHref="#/generate"
                />
            ) : (
                <div className="row">
                    {customQuizzes.map((quiz) => (
                        <div key={quiz.id} className="col-md-6 mb-4">
                            <QuizCard
                                quiz={quiz}
                                showDelete={true}
                                onTakeQuiz={() => {
                                    sessionStorage.setItem('selectedQuizId', quiz.id)
                                    setSelectedQuizId(quiz.id)
                                }}
                                onDelete={() => deleteQuiz(quiz.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
