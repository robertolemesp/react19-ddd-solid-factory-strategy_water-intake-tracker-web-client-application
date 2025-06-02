import type { FieldValidator, FieldValidationErrors } from '@/domain/_shared/validation/model'

export interface ValidationServiceInterface {
  validateDtoByFieldValidators <T extends Record<keyof T, unknown>>(object: T, fieldValidators: Record<keyof T, FieldValidator[]>): FieldValidationErrors<T>
  composeValidators<Args extends unknown[]>(
    ...validators: { [K in keyof Args]: (value: Args[K]) => FieldValidationErrors<Args[K]> }
  ): (...args: Args) => FieldValidationErrors<Args>
}
