export default function ScoreDisplay({ score, total }) {
    return (
        <div style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#2c3e50',
            marginBottom: '1rem'
        }}>
            Score: <span style={{ color: '#667eea' }}>{score}</span>/{total}
        </div>
    )
}
