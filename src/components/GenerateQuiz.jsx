import { useState, useEffect } from 'react'
import FormSection from './FormSection'
import QuestionSelector from './QuestionSelector'
import QuestionEditor from './QuestionEditor'

export default function GenerateQuiz() {
    const [quizTitle, setQuizTitle] = useState(() => {
        return sessionStorage.getItem('draftQuizTitle') || ''
    })
    const [quizDescription, setQuizDescription] = useState(() => {
        return sessionStorage.getItem('draftQuizDescription') || ''
    })
    const [questions, setQuestions] = useState(() => {
        const saved = sessionStorage.getItem('draftQuestions')
        return saved ? JSON.parse(saved) : [
            { id: 'q-' + Math.random(), text: '', choices: ['', '', '', ''], answerIndex: 0 }
        ]
    })
    const [expandedQuestion, setExpandedQuestion] = useState(() => {
        return parseInt(sessionStorage.getItem('draftExpandedQuestion') || '0')
    })
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')

    // Save draft whenever form data changes
    useEffect(() => {
        sessionStorage.setItem('draftQuizTitle', quizTitle)
    }, [quizTitle])

    useEffect(() => {
        sessionStorage.setItem('draftQuizDescription', quizDescription)
    }, [quizDescription])

    useEffect(() => {
        sessionStorage.setItem('draftQuestions', JSON.stringify(questions))
    }, [questions])

    useEffect(() => {
        sessionStorage.setItem('draftExpandedQuestion', expandedQuestion.toString())
    }, [expandedQuestion])

    const addQuestion = () => {
        setQuestions([...questions, { id: 'q-' + Math.random(), text: '', choices: ['', '', '', ''], answerIndex: 0 }])
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

    const validateQuiz = () => {
        if (!quizTitle.trim()) {
            setError('Please enter a quiz title')
            return false
        }
        if (!quizDescription.trim()) {
            setError('Please enter a quiz description')
            return false
        }
        if (questions.length === 0) {
            setError('Please add at least one question')
            return false
        }
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].text.trim()) {
                setError(`Question ${i + 1} is missing text`)
                return false
            }
            for (let j = 0; j < questions[i].choices.length; j++) {
                if (!questions[i].choices[j].trim()) {
                    setError(`Question ${i + 1}, Choice ${j + 1} is empty`)
                    return false
                }
            }
        }
        return true
    }

    const submitQuiz = () => {
        setError('')

        if (!validateQuiz()) {
            return
        }

        const newQuiz = {
            id: `custom-${Date.now()}`,
            title: quizTitle,
            description: quizDescription,
            questions: questions.map(q => ({
                id: Math.random(),
                text: q.text,
                choices: q.choices,
                answerIndex: q.answerIndex
            }))
        }

        try {
            const existingQuizzes = JSON.parse(sessionStorage.getItem('customQuizzes')) || []
            existingQuizzes.push(newQuiz)
            sessionStorage.setItem('customQuizzes', JSON.stringify(existingQuizzes))

            setModalTitle(quizTitle)
            setShowModal(true)

            // Reset form after modal closes
            setTimeout(() => {
                setQuizTitle('')
                setQuizDescription('')
                setQuestions([{ id: 'q-' + Math.random(), text: '', choices: ['', '', '', ''], answerIndex: 0 }])
                setExpandedQuestion(0)
                // Clear draft from sessionStorage
                sessionStorage.removeItem('draftQuizTitle')
                sessionStorage.removeItem('draftQuizDescription')
                sessionStorage.removeItem('draftQuestions')
                sessionStorage.removeItem('draftExpandedQuestion')
            }, 1500)
        } catch (err) {
            setError('Failed to save quiz. Please try again.')
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <h2 className="mb-4">Create Your Own Quiz</h2>

            {error && (
                <div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>
            )}

            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={{ borderBottom: '2px solid #667eea' }}>
                                <h5 className="modal-title" style={{ color: '#2c3e50', fontWeight: 600 }}>Quiz Created!</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body text-center">
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                                <p style={{ fontSize: '1.1rem', color: '#2c3e50', marginBottom: '0.5rem' }}>
                                    Your quiz <strong>"{modalTitle}"</strong> has been created successfully!
                                </p>
                                <p style={{ color: '#555', fontSize: '0.95rem' }}>
                                    You can now find it in your custom quizzes list.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={closeModal}>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card quiz-selection mb-4">
                <div className="card-body">
                    <FormSection
                        label="Quiz Title"
                        value={quizTitle}
                        onChange={setQuizTitle}
                        placeholder="Enter quiz title"
                    />
                    <FormSection
                        label="Quiz Description"
                        value={quizDescription}
                        onChange={setQuizDescription}
                        placeholder="Enter quiz description"
                    />
                </div>
            </div>

            <h3 className="mb-3" style={{ color: '#2c3e50', fontWeight: 600 }}>Questions ({questions.length})</h3>

            <div className="row" style={{ alignItems: 'flex-start' }}>
                <div className="col-md-3 mb-3">
                    <QuestionSelector
                        questions={questions}
                        expanded={expandedQuestion}
                        onSelect={setExpandedQuestion}
                    />
                    <button className="btn btn-primary mt-2 w-100" onClick={addQuestion}>
                        + Add Question
                    </button>
                </div>

                <div className="col-md-9">
                    <div className="card quiz-selection" style={{ marginTop: 0 }}>
                        <div className="card-body">
                            <QuestionEditor
                                question={questions[expandedQuestion]}
                                index={expandedQuestion}
                                onTextChange={updateQuestion}
                                onChoiceChange={updateChoice}
                                onAnswerChange={updateQuestion}
                            />

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
                <button className="btn btn-primary" onClick={submitQuiz}>
                    Submit Quiz
                </button>
            </div>
        </div>
    )
}
