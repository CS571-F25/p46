export default function QuestionEditor({ question, index, onTextChange, onChoiceChange, onAnswerChange }) {
    const questionInputId = `question-${question.id}`
    return (
        <div className="mb-3">
            <label htmlFor={questionInputId} className="form-label">Question {index + 1}</label>
            <input
                id={questionInputId}
                type="text"
                className="form-control"
                value={question.text}
                onChange={(e) => onTextChange(index, 'text', e.target.value)}
                placeholder="Enter question text"
                aria-label={`Question ${index + 1} text`}
            />

            <label className="form-label mt-3">Answer Choices</label>
            <div key={`radio-group-${question.id}`}>
                {question.choices.map((choice, cIndex) => {
                    const choiceInputId = `choice-${question.id}-${cIndex}`
                    return (
                        <div key={`choice-${cIndex}`} className="mb-2">
                            <div className="input-group">
                                <input
                                    id={choiceInputId}
                                    type="text"
                                    className="form-control"
                                    value={choice}
                                    onChange={(e) => onChoiceChange(index, cIndex, e.target.value)}
                                    placeholder={`Choice ${cIndex + 1}`}
                                    aria-label={`Choice ${cIndex + 1} for Question ${index + 1}`}
                                />
                                <div className="input-group-text">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name={`answer-${question.id}`}
                                        value={cIndex}
                                        checked={question.answerIndex === cIndex}
                                        onChange={(e) => onAnswerChange(index, 'answerIndex', parseInt(e.target.value))}
                                        title="Mark as correct answer"
                                        aria-label={`Mark Choice ${cIndex + 1} as correct answer for Question ${index + 1}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
