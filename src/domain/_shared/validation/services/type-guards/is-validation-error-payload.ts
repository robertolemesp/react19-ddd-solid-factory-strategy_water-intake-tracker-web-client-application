import { FieldValidationErrors } from '@/domain/_shared/validation/model'

export const isApplicationErrorOfValidationError = <T>(payload: unknown): payload is FieldValidationErrors<T> => 
  Array.isArray(payload) && payload.length > 0 && payload.every(item => 
    typeof item === 'object' && 
      !!item && 
      'fieldName' in item && Array.isArray((item as any).errorMessages) || 
      'fieldGroup' in item && Array.isArray((item as any).erroredFields)
  )
