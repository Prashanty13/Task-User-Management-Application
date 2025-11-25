import { useState } from 'react'
import type { User, UserPayload } from '../types/user'
import { useFormValidation } from '../hooks/useFormValidation'
import { ValidatedInput } from './ValidatedInput'

interface UserFormProps {
  mode: 'create' | 'edit'
  initialData?: User
  onSubmit: (payload: UserPayload) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
}

const validationSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    required: true,
    pattern: /^[\d\s\-\+\(\)]+$/,
    message: 'Please enter a valid phone number'
  },
  website: {
    pattern: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid website (e.g., example.com)'
  },
  street: {
    minLength: 3,
    message: 'Street must be at least 3 characters'
  },
  city: {
    minLength: 2,
    message: 'City must be at least 2 characters'
  },
  companyName: {
    minLength: 2,
    message: 'Company name must be at least 2 characters'
  }
}

export const UserForm = ({ mode, initialData, onSubmit, onCancel, isSubmitting }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    street: initialData?.address?.street || '',
    suite: initialData?.address?.suite || '',
    city: initialData?.address?.city || '',
    companyName: initialData?.company?.name || '',
    catchPhrase: initialData?.company?.catchPhrase || '',
    bs: initialData?.company?.bs || ''
  })

  const [serverError, setServerError] = useState<string | null>(null)
  const { errors, touched, validateForm, handleBlur } = useFormValidation(validationSchema)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setServerError(null)
  }

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    handleBlur(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    // Client-side validation
    if (!validateForm(formData)) {
      return
    }

    const payload: UserPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || undefined,
      address: formData.street || formData.city ? {
        street: formData.street,
        suite: formData.suite,
        city: formData.city
      } : undefined,
      company: formData.companyName ? {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
        bs: formData.bs
      } : undefined
    }

    try {
      await onSubmit(payload)
      if (mode === 'create') {
        setFormData({
          name: '', email: '', phone: '', website: '',
          street: '', suite: '', city: '',
          companyName: '', catchPhrase: '', bs: ''
        })
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

      <div className="form-section">
        <h3>Basic Information</h3>
        <div className="form-row">
          <ValidatedInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            error={errors.name}
            touched={touched.name}
            required
            placeholder="John Doe"
          />
          <ValidatedInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            error={errors.email}
            touched={touched.email}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="form-row">
          <ValidatedInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            error={errors.phone}
            touched={touched.phone}
            required
            placeholder="123-456-7890"
          />
          <ValidatedInput
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            error={errors.website}
            touched={touched.website}
            placeholder="example.com"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Address</h3>
        <div className="form-row">
          <ValidatedInput
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            error={errors.street}
            touched={touched.street}
            placeholder="123 Main St"
          />
          <ValidatedInput
            label="Suite"
            name="suite"
            value={formData.suite}
            onChange={handleChange}
            placeholder="Apt 4"
          />
        </div>
        <ValidatedInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          error={errors.city}
          touched={touched.city}
          placeholder="New York"
        />
      </div>

      <div className="form-section">
        <h3>Company</h3>
        <ValidatedInput
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          error={errors.companyName}
          touched={touched.companyName}
          placeholder="Acme Corp"
        />
        <ValidatedInput
          label="Catch Phrase"
          name="catchPhrase"
          value={formData.catchPhrase}
          onChange={handleChange}
          placeholder="Innovation at its best"
        />
        <ValidatedInput
          label="Business"
          name="bs"
          value={formData.bs}
          onChange={handleChange}
          placeholder="synergize scalable solutions"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="button primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create User' : 'Update User'}
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
