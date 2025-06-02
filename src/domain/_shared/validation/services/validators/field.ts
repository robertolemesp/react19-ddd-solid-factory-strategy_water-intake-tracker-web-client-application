import type { FieldValidator, FieldValidationError, FieldValidationErrorMessage } from '@/domain/_shared/validation/model'

export const validateField = <T extends Record<keyof T, unknown>>(
  fieldName: keyof T,
  value: unknown,
  fieldValidators: FieldValidator[] = []
): FieldValidationError<T> | void => {
  const errorMessages: FieldValidationErrorMessage[] = []

  for (const validator of fieldValidators) {
    try {
      validator.validate(value)
    } catch (error) {
      errorMessages.push((error as Error).message as FieldValidationErrorMessage)
    }
  }

  if (errorMessages.length) 
    return { fieldName, errorMessages }
}
