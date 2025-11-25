import { ValidationError } from './errors'
import type { UserPayload } from '../types/user'
import type { TaskPayload } from '../types/task'

/**
 * Server-side validation for User
 */
export function validateUserServer(payload: UserPayload): void {
  // Name validation
  if (!payload.name || payload.name.trim().length < 2) {
    throw new ValidationError('Name must be at least 2 characters', 'name')
  }
  
  if (payload.name.length > 50) {
    throw new ValidationError('Name must be at most 50 characters', 'name')
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!payload.email || !emailRegex.test(payload.email)) {
    throw new ValidationError('Invalid email address', 'email')
  }

  // Check for duplicate email (mock - in real app, check database)
  const existingUsers = JSON.parse(localStorage.getItem('users_db') || '[]')
  const isDuplicate = existingUsers.some((u: any) => u.email === payload.email)
  if (isDuplicate) {
    throw new ValidationError('Email already exists', 'email')
  }

  // Phone validation
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  if (!payload.phone || !phoneRegex.test(payload.phone)) {
    throw new ValidationError('Invalid phone number', 'phone')
  }

  // Website validation (if provided)
  if (payload.website) {
    const websiteRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
    if (!websiteRegex.test(payload.website)) {
      throw new ValidationError('Invalid website format', 'website')
    }
  }

  // Address validation (if provided)
  if (payload.address) {
    if (payload.address.street && payload.address.street.length < 3) {
      throw new ValidationError('Street must be at least 3 characters', 'street')
    }
    if (payload.address.city && payload.address.city.length < 2) {
      throw new ValidationError('City must be at least 2 characters', 'city')
    }
  }

  // Company validation (if provided)
  if (payload.company) {
    if (payload.company.name && payload.company.name.length < 2) {
      throw new ValidationError('Company name must be at least 2 characters', 'companyName')
    }
  }
}

/**
 * Server-side validation for Task
 */
export function validateTaskServer(payload: TaskPayload): void {
  // Title validation
  if (!payload.title || payload.title.trim().length < 3) {
    throw new ValidationError('Title must be at least 3 characters', 'title')
  }
  
  if (payload.title.length > 100) {
    throw new ValidationError('Title must be at most 100 characters', 'title')
  }

  // Description validation (if provided)
  if (payload.description && payload.description.length > 500) {
    throw new ValidationError('Description must be at most 500 characters', 'description')
  }

  // UserId validation
  if (!payload.userId || payload.userId < 1) {
    throw new ValidationError('Invalid user ID', 'userId')
  }
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj }
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]) as any
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key])
    }
  }
  
  return sanitized
}
