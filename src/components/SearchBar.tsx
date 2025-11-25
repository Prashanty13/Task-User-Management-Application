interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => (
  <div className="search-bar">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="search-input"
    />
    {value && (
      <button className="search-clear" onClick={() => onChange('')}>
        ✕
      </button>
    )}
  </div>
)
