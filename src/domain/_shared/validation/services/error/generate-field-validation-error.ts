import type { FieldValidationErrorMessage } from '@/domain/_shared/validation/model'

import { fieldValidationErrorMessages } from '@/domain/_shared/validation/constants'

export const generateFieldValidationError = (message: FieldValidationErrorMessage, target?: unknown): never => {
  throw new Error(
    message ? 
      `${fieldValidationErrorMessages[message]}${target ? `: ${target}` : ''}` 
    : 
      'Invalid field.'
    )
}
