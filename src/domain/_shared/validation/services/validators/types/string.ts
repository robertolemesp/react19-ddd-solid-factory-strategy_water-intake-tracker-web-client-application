import { type FieldValidator, FieldValidationErrorType } from '@/domain/_shared/validation/model'

import { generateFieldValidationError } from '@/domain/_shared/validation/services/error/generate-field-validation-error'

export class TooShortValidator implements FieldValidator {
  constructor(private minLength: number) {}

  validate(value: unknown) {
    if (typeof value === 'string' && value.length < this.minLength) 
      generateFieldValidationError(FieldValidationErrorType.TOO_SHORT)
  }
}

export class TooLongValidator implements FieldValidator {
  constructor(private maxLength: number) {}

  validate(value: unknown) {
    if (typeof value === 'string' && value.length > this.maxLength)
      generateFieldValidationError(FieldValidationErrorType.TOO_LONG)
  }
}

export class PatternMismatchValidator implements FieldValidator {
  constructor(private pattern: RegExp) {}

  validate(value: string) {
    if (typeof value === 'string' && !this.pattern.test(value))
      generateFieldValidationError(FieldValidationErrorType.PATTERN_MISMATCH)
  }
}
