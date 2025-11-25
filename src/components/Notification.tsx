type NotificationProps = {
  type: 'success' | 'error'
  message: string
  onClose?: () => void
}

export const Notification = ({ type, message, onClose }: NotificationProps) => (
  <div className={`notification ${type}`}>
    <span>{message}</span>
    {onClose ? (
      <button type="button" className="text-button" onClick={onClose}>
        Dismiss
      </button>
    ) : null}
  </div>
)

