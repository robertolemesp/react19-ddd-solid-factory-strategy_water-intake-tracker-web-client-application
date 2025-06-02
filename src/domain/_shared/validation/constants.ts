import { FieldValidationErrorType } from './model'

export const fieldValidationErrorMessages: Record<FieldValidationErrorType, string> = {
  [FieldValidationErrorType.REQUIRED]: 'The field is required.',
  [FieldValidationErrorType.TOO_SHORT]: 'The field is too short.',
  [FieldValidationErrorType.TOO_LONG]: 'The field is too long.',
  [FieldValidationErrorType.PATTERN_MISMATCH]: 'The field does not match the required pattern.',
  [FieldValidationErrorType.NEGATIVE_NUMBER]: 'The field value should be greater than 0.',
  [FieldValidationErrorType.NOT_A_NUMBER]: 'The field value is not a number.',
  [FieldValidationErrorType.GTE]: 'The field value is less than',
  [FieldValidationErrorType.LTE]: 'The field value is more than',
  [FieldValidationErrorType.INVALID_DATE]: 'The date field value is invalid.',
}
