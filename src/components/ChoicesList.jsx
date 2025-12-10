import AnswerChoice from './AnswerChoice'

export default function ChoicesList({ choices, selected, correct, locked, completed, onSelect }) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {choices.map((choice, index) => {
                const isSelected = selected === index
                const isCorrect = index === correct
                return (
                    <AnswerChoice
                        key={`choice-${index}`}
                        choice={choice}
                        index={index}
                        isSelected={isSelected}
                        isCorrect={isCorrect}
                        isWrong={isSelected && !isCorrect}
                        locked={locked}
                        completed={completed}
                        onSelect={onSelect}
                    />
                )
            })}
        </div>
    )
}
