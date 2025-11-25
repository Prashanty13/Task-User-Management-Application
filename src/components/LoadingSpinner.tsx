export const LoadingSpinner = ({ label = 'Loading' }: { label?: string }) => (
  <div className="spinner">
    <div className="spinner-dot" />
    <p>{label}...</p>
  </div>
)

