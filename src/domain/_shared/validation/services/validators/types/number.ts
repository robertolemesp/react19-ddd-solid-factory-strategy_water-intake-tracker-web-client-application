import { type FieldValidator, FieldValidationErrorType } from '@/domain/_shared/validation/model'

import { generateFieldValidationError } from '@/domain/_shared/validation/services/error/generate-field-validation-error'

export class NumberValidator implements FieldValidator {
  constructor(private gte?: number, private lte?: number) {}

  validate(value: unknown) {
    if (typeof value !== 'number' || Number.isNaN(value)) 
      generateFieldValidationError(FieldValidationErrorType.NOT_A_NUMBER)
    
    if (this.gte && Number(value) < this.gte) 
      generateFieldValidationError(FieldValidationErrorType.GTE, this.gte)
    
    if (this.lte && Number(value) > this.lte) 
      generateFieldValidationError(FieldValidationErrorType.LTE, this.lte)
  }
}
