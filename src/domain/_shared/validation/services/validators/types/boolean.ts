import { type FieldValidator, FieldValidationErrorType } from '@/domain/_shared/validation/model'

import { generateFieldValidationError } from '@/domain/_shared/validation/services/error/generate-field-validation-error'

export class BooleanValidator implements FieldValidator {
  constructor(private expected?: boolean) {} 

  validate(value: unknown) {
    if (typeof value !== 'boolean') 
      generateFieldValidationError(FieldValidationErrorType.PATTERN_MISMATCH, 'Expected boolean')

    if (this.expected && value !== this.expected) 
      generateFieldValidationError(FieldValidationErrorType.PATTERN_MISMATCH, `Expected ${this.expected}`)
  }
}
