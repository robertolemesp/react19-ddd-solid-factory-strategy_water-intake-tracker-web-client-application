import type { 
  DomainErrorPayload, ErrorOrigin, ErrorType, InfrastructureErrorPayload, MiscellaneousErrorPayload, ApplicationErrorPayload, SystemErrorPayload
} from '@/domain/error/model'
import type { FieldValidationErrors, FieldValidationErrorType } from '@/domain/_shared/validation/model'

import { DomainErrorEntity, ApplicationErrorEntity, InfrastructureErrorEntity, MiscellaneousErrorEntity } from '@/domain/error/entity'

export interface ErrorServiceInterface {
  generateDomainError(origin: ErrorOrigin, payload: DomainErrorPayload): DomainErrorEntity
  generateApplicationError<T>(origin: ErrorOrigin, payload: ApplicationErrorPayload | FieldValidationErrors<T>): ApplicationErrorEntity<T>
  generateInfrastructureError(origin: ErrorOrigin, payload: InfrastructureErrorPayload): InfrastructureErrorEntity
  generateMiscellaneousError(origin: ErrorOrigin, payload: MiscellaneousErrorPayload): MiscellaneousErrorEntity

  generateApplicationErrorMessage<E extends Record<T, string>, T extends keyof E>(errorRecord: E, errorType: T): string
  
  isSystemError(error: unknown): error is SystemErrorPayload
  
  errorServiceMap: Record<ErrorType, unknown>
}
