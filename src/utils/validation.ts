import { ValidationError } from './errors'

export interface ValidationRule<T> {
  validate: (value: T) => boolean
  message: string
}

/**
 * Validate email format
 */
export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    throw new ValidationError('Email is required', 'email')
  }
  
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format', 'email')
  }
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string): void {
  if (!value || value.trim() === '') {
    throw new ValidationError(`${fieldName} is required`, fieldName)
  }
}

/**
 * Validate string length
 */
export function validateLength(
  value: string,
  fieldName: string,
  min?: number,
  max?: number
): void {
  if (min && value.length < min) {
    throw new ValidationError(
      `${fieldName} must be at least ${min} characters`,
      fieldName
    )
  }
  
  if (max && value.length > max) {
    throw new ValidationError(
      `${fieldName} must be at most ${max} characters`,
      fieldName
    )
  }
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): void {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  
  if (!phone) {
    throw new ValidationError('Phone is required', 'phone')
  }
  
  if (!phoneRegex.test(phone)) {
    throw new ValidationError('Invalid phone format', 'phone')
  }
}

/**
 * Generic validator
 */
export function validate<T>(
  value: T,
  rules: ValidationRule<T>[],
  fieldName: string
): void {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      throw new ValidationError(rule.message, fieldName)
    }
  }
}
