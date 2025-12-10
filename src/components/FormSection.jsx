export default function FormSection({ label, value, onChange, placeholder }) {
    const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`
    return (
        <div className="mb-3">
            <label htmlFor={inputId} className="form-label">{label}</label>
            <input
                id={inputId}
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={label}
            />
        </div>
    )
}
