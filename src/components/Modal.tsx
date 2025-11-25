import type { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, title, description, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            {title ? <h3>{title}</h3> : null}
            {description ? <p className="muted">{description}</p> : null}
          </div>
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

