import { type FieldValidator, FieldValidationErrorType } from '@/domain/_shared/validation/model'

import { generateFieldValidationError } from '@/domain/_shared/validation/services/error/generate-field-validation-error'

export class RequiredValidator implements FieldValidator {
  constructor() {}

  validate(value: unknown) {
    if (!!!value && typeof value === 'string' && !value.trim() || (Array.isArray(value) && !value.length))
      generateFieldValidationError(FieldValidationErrorType.REQUIRED)
  }
}
