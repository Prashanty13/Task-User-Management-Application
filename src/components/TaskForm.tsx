import { useState } from 'react'
import type { Task, TaskPayload } from '../types/task'
import { useFormValidation } from '../hooks/useFormValidation'
import { ValidatedInput } from './ValidatedInput'

interface TaskFormProps {
  mode: 'create' | 'edit'
  initialData?: Task
  onSubmit: (payload: TaskPayload) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
}

const validationSchema = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
    message: 'Title must be between 3 and 100 characters'
  },
  description: {
    maxLength: 500,
    message: 'Description must be at most 500 characters'
  }
}

export const TaskForm = ({ mode, initialData, onSubmit, onCancel, isSubmitting }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    completed: initialData?.completed || false
  })

  const [serverError, setServerError] = useState<string | null>(null)
  const { errors, touched, validateForm, handleBlur } = useFormValidation(validationSchema)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setServerError(null)
  }

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    handleBlur(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    // Client-side validation
    if (!validateForm({ title: formData.title, description: formData.description })) {
      return
    }

    try {
      await onSubmit({
        title: formData.title,
        description: formData.description,
        completed: formData.completed,
        userId: 1
      })

      if (mode === 'create') {
        setFormData({ title: '', description: '', completed: false })
      }
    } catch (error) {
      // Server-side validation error
      setServerError(error instanceof Error ? error.message : 'Submission failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {serverError && (
        <div className="server-error">
          {serverError}
        </div>
      )}

      <ValidatedInput
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        error={errors.title}
        touched={touched.title}
        required
        placeholder="Task title"
      />

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          placeholder="Task description"
          rows={3}
          maxLength={500}
          className={touched.description && errors.description ? 'error' : ''}
        />
        {touched.description && errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
        <small className="muted">{formData.description.length}/500 characters</small>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <span>Mark as completed</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="button primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Update Task'}
        </button>
        {onCancel && (
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
