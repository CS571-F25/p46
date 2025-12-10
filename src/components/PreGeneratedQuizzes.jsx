import { useState, useEffect } from 'react'
import QuizView from './QuizView'

const PREDEFINED_QUIZZES = [
    {
        id: 'math-1',
        title: 'Basic Math',
        description: 'A math quiz to test arithmetic and simple reasoning.',
        questions: [
            {
                id: 1,
                text: 'What is 7 + 6?',
                choices: ['12', '13', '14', '15'],
                answerIndex: 1,
            },
            {
                id: 2,
                text: 'What is 9 × 3?',
                choices: ['27', '21', '24', '30'],
                answerIndex: 0,
            },
            {
                id: 3,
                text: 'If x = 4, what is 2x + 5?',
                choices: ['13', '9', '11', '8'],
                answerIndex: 0,
            },
            {
                id: 4,
                text: 'What is 48 ÷ 6?',
                choices: ['6', '8', '7', '9'],
                answerIndex: 1,
            },
            {
                id: 5,
                text: 'What is 15% of 200?',
                choices: ['20', '30', '25', '35'],
                answerIndex: 1,
            },
            {
                id: 6,
                text: 'If a triangle has angles of 60° and 70°, what is the third angle?',
                choices: ['50°', '60°', '70°', '80°'],
                answerIndex: 0,
            },
            {
                id: 7,
                text: 'What is the square root of 144?',
                choices: ['11', '12', '13', '14'],
                answerIndex: 1,
            },
            {
                id: 8,
                text: 'What is 3^4 (3 to the power of 4)?',
                choices: ['81', '64', '27', '12'],
                answerIndex: 0,
            },
            {
                id: 9,
                text: 'If you have 5 apples and buy 3 more, then give away 2, how many do you have?',
                choices: ['5', '6', '7', '8'],
                answerIndex: 2,
            },
            {
                id: 10,
                text: 'What is the average of 10, 20, and 30?',
                choices: ['15', '20', '25', '30'],
                answerIndex: 1,
            },
        ],
    },
    {
        id: 'science-1',
        title: 'Basic Science',
        description: 'Quiz on general science facts and concepts.',
        questions: [
            {
                id: 1,
                text: 'Water freezes at what temperature (°C)?',
                choices: ['0', '32', '-10', '100'],
                answerIndex: 0,
            },
            {
                id: 2,
                text: 'Which gas do plants primarily absorb?',
                choices: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
                answerIndex: 2,
            },
            {
                id: 3,
                text: 'Earth orbits around the ____.',
                choices: ['Moon', 'Sun', 'Mars', 'Venus'],
                answerIndex: 1,
            },
            {
                id: 4,
                text: 'What is the chemical symbol for Gold?',
                choices: ['Go', 'Gd', 'Au', 'Ag'],
                answerIndex: 2,
            },
            {
                id: 5,
                text: 'Which planet is the largest in our solar system?',
                choices: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
                answerIndex: 1,
            },
            {
                id: 6,
                text: 'What do bees primarily collect from flowers?',
                choices: ['Water', 'Pollen', 'Seeds', 'Leaves'],
                answerIndex: 1,
            },
            {
                id: 7,
                text: 'How many bones are in the adult human body?',
                choices: ['186', '206', '226', '246'],
                answerIndex: 1,
            },
            {
                id: 8,
                text: 'What is the process by which plants make their own food?',
                choices: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
                answerIndex: 1,
            },
            {
                id: 9,
                text: 'Which blood type is considered the universal donor?',
                choices: ['A', 'B', 'O', 'AB'],
                answerIndex: 2,
            },
            {
                id: 10,
                text: 'At what temperature does water boil (°C)?',
                choices: ['90', '100', '110', '120'],
                answerIndex: 1,
            },
        ],
    },
    {
        id: 'history-1',
        title: 'World History',
        description: 'Quiz on major events and figures in world history.',
        questions: [
            {
                id: 1,
                text: 'Who was the first President of the United States?',
                choices: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
                answerIndex: 2,
            },
            {
                id: 2,
                text: 'The Great Wall is primarily located in which country?',
                choices: ['India', 'China', 'Japan', 'Korea'],
                answerIndex: 1,
            },
            {
                id: 3,
                text: 'In which century did the Renaissance begin?',
                choices: ['14th', '12th', '18th', '20th'],
                answerIndex: 0,
            },
            {
                id: 4,
                text: 'Who was the French military leader during the Napoleonic Wars?',
                choices: ['Napoleon Bonaparte', 'Louis XVI', 'Cardinal Richelieu', 'Jean-Paul Marat'],
                answerIndex: 0,
            },
            {
                id: 5,
                text: 'In what year did Christopher Columbus sail to the Americas?',
                choices: ['1485', '1492', '1500', '1510'],
                answerIndex: 1,
            },
            {
                id: 6,
                text: 'Which empire built the Colosseum in Rome?',
                choices: ['Greek', 'Roman', 'Ottoman', 'Byzantine'],
                answerIndex: 1,
            },
            {
                id: 7,
                text: 'Who painted the Mona Lisa?',
                choices: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
                answerIndex: 1,
            },
            {
                id: 8,
                text: 'In which year did the Berlin Wall fall?',
                choices: ['1987', '1988', '1989', '1990'],
                answerIndex: 2,
            },
            {
                id: 9,
                text: 'Which ancient wonder was the tallest structure in the world for thousands of years?',
                choices: ['Statue of Zeus', 'Lighthouse of Alexandria', 'Great Pyramid of Giza', 'Hanging Gardens of Babylon'],
                answerIndex: 2,
            },
            {
                id: 10,
                text: 'In what year did the Titanic sink?',
                choices: ['1910', '1911', '1912', '1913'],
                answerIndex: 2,
            },
        ],
    },
]

export default function PreGeneratedQuizzes() {
    const [selectedQuizId, setSelectedQuizId] = useState(() => {
        return sessionStorage.getItem('activePredefinedQuizId') || null
    })

    useEffect(() => {
        if (selectedQuizId) {
            sessionStorage.setItem('activePredefinedQuizId', selectedQuizId)
        } else {
            sessionStorage.removeItem('activePredefinedQuizId')
        }
    }, [selectedQuizId])

    const selectedQuiz = PREDEFINED_QUIZZES.find(q => q.id === selectedQuizId) || null

    return (
        <div>
            <h2 className="mb-4">Pre-generated Quizzes</h2>

            {!selectedQuiz && (
                <div className="card quiz-selection mb-4">
                    <div className="card-body">
                        <h3 className="card-title">Select a quiz</h3>
                        <p className="card-text">Choose one of the pre-generated quizzes below to begin. Each quiz provides instant feedback and shows your score at the end.</p>
                    </div>
                </div>
            )}

            {!selectedQuiz ? (
                <div>
                    <h3 style={{ color: '#2c3e50', fontWeight: 600, marginBottom: '1rem' }}>Available Quizzes</h3>
                    <div className="row mb-4">
                        {PREDEFINED_QUIZZES.map(quiz => (
                            <div className="col-md-4 mb-3" key={quiz.id}>
                                <div className="card quiz-selection h-100" style={{ cursor: 'pointer' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{quiz.title}</h5>
                                        <p className="card-text">{quiz.description}</p>
                                        <button className="btn btn-primary" onClick={() => setSelectedQuizId(quiz.id)}>Take Quiz</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="alert alert-info mb-4">
                        <h5>You're taking: <strong>{selectedQuiz.title}</strong></h5>
                    </div>
                    <QuizView quiz={selectedQuiz} onExit={() => setSelectedQuizId(null)} />
                </div>
            )}
        </div>
    )
}
