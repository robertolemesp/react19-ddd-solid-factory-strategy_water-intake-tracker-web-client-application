import type { ValidationServiceInterface } from './model'

import type { FieldValidationErrors, FieldValidator } from '@/domain/_shared/validation/model'

import { validateField } from '@/domain/_shared/validation/services/validators/field'

export class ValidationService implements ValidationServiceInterface {
  constructor() {}

  validateDtoByFieldValidators = <T extends Partial<Record<keyof T, unknown>>>(object: T, fieldValidators: Record<keyof T, FieldValidator[]>) => {
    const errors: FieldValidationErrors<T> = []

    for (const fieldValidator in fieldValidators) {
      const fieldName = fieldValidator as keyof T
      
      const validationError = validateField<T>(fieldName, object[fieldName], fieldValidators[fieldName])

      if (validationError) 
        errors.push(validationError)
    }

    return errors
  }

  composeValidators = <Args extends unknown[]>(...validators: { [K in keyof Args]: (value: Args[K])  => FieldValidationErrors<Args[K]> }) => 
    (...args: Args): FieldValidationErrors<Args> => {
      const composedValidationErrors: FieldValidationErrors<Args> = []

      for (const [index, validator] of validators.entries()) {
        const value = args[index]
        const validationErrors = validator(value)

        if (validationErrors.length)
          composedValidationErrors.push(...validationErrors)
      
      }

      return composedValidationErrors
    }
}
