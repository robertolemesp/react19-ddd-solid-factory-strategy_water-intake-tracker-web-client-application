import type { FieldValidator, FieldValidationErrors } from '@/domain/_shared/validation/model'

import { validateField } from './field'

export const validateDomainEntity = <T extends Record<keyof T, unknown>>(
  object: T, fieldValidators: Record<keyof T, FieldValidator[]>
): FieldValidationErrors<T> | void => {
  const errors: FieldValidationErrors<T> = []

  for (const key in fieldValidators) {
    const fieldName = key as keyof T
    const validationError = validateField<T>(fieldName, object[fieldName], fieldValidators[fieldName])

    if (validationError) 
      errors.push(validationError)
  }

  if (errors.length > 0) 
    return errors
}
