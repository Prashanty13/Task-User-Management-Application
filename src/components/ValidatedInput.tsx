interface ValidatedInputProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  required?: boolean
  placeholder?: string
  disabled?: boolean
}

export const ValidatedInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  placeholder,
  disabled
}: ValidatedInputProps) => {
  const showError = touched && error

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={showError ? 'error' : ''}
        aria-invalid={!!error}   // ✅ FIXED
        aria-describedby={showError ? `${name}-error` : undefined}
      />

      {showError && (
        <span id={`${name}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  )
}

