import { type FieldValidator, FieldValidationErrorType } from '@/domain/_shared/validation/model'

import { generateFieldValidationError } from '@/domain/_shared/validation/services/error/generate-field-validation-error'

export class DateValidator implements FieldValidator {
  constructor(private isToday?: boolean, private gte?: Date, private lte?: Date) {}

  validate(value: unknown) {
    const date = new Date(value as string | number | Date)

    if (!value || Number.isNaN(date.getTime())) 
      generateFieldValidationError(FieldValidationErrorType.INVALID_DATE)
    
    if (this.gte && date < this.gte) 
      generateFieldValidationError(FieldValidationErrorType.GTE, this.gte.toISOString())
    
    if (this.lte && date > this.lte) 
      generateFieldValidationError(FieldValidationErrorType.LTE, this.lte.toISOString())

    if (this.isToday && date.toISOString().split('T')[0] !== new Date().toISOString().split('T')[0]) 
      generateFieldValidationError(FieldValidationErrorType.INVALID_DATE, 'date must be today')
  }
}
