import { fieldValidationErrorMessages } from './constants'

export type FieldValidationErrorMessage = keyof typeof fieldValidationErrorMessages 

export interface FieldValidator {
  validate(value: unknown): void
}

export enum FieldValidationErrorType {
  REQUIRED = 'REQUIRED',
  TOO_SHORT = 'TOO_SHORT',
  TOO_LONG = 'TOO_LONG',
  PATTERN_MISMATCH = 'PATTERN_MISMATCH',
  NEGATIVE_NUMBER = 'NEGATIVE_NUMBER',
  NOT_A_NUMBER = 'NOT_A_NUMBER',
  LTE = 'LTE',
  GTE = 'GTE',
  INVALID_DATE = 'INVALID_DATE'
}

export interface FieldValidationError<T> { 
  fieldName: keyof T
  errorMessages: FieldValidationErrorMessage[]
}

export interface FieldGroupValidationError<T> { 
  fieldGroup: keyof T
  erroredFields: FieldValidationError<T>[]
}

export type FieldValidationErrors<T> = Array<FieldValidationError<T> | FieldGroupValidationError<T>>
