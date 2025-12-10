import AnswerChoice from './AnswerChoice'

export default function ChoicesList({ choices, selected, correct, locked, completed, onSelect }) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {choices.map((choice, index) => (
                <AnswerChoice
                    key={index}
                    choice={choice}
                    index={index}
                    isSelected={selected === index}
                    isCorrect={index === correct}
                    isWrong={selected === index && index !== correct}
                    locked={locked}
                    completed={completed}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}
