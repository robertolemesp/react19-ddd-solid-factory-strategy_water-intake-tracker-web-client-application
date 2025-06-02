import type { ErrorServiceInterface } from './model'
import type {
  SystemError, DomainErrorOrigin, ApplicationErrorOrigin, InfrastructureErrorOrigin, MiscellaneousErrorOrigin,
  DomainErrorPayload, ApplicationErrorPayload, InfrastructureErrorPayload, MiscellaneousErrorPayload, 
} from '@/domain/error/model'

import type { FieldValidationErrors } from '@/domain/_shared/validation/model'

import { DomainErrorEntity, ApplicationErrorEntity, InfrastructureErrorEntity, MiscellaneousErrorEntity } from '@/domain/error/entity'

export class ErrorService implements ErrorServiceInterface {
  generateDomainError = (origin: DomainErrorOrigin, payload: DomainErrorPayload, message?: string): DomainErrorEntity => new DomainErrorEntity(origin, payload, message)

  generateApplicationError = <T>(
    origin: ApplicationErrorOrigin | ApplicationErrorOrigin[], payload: ApplicationErrorPayload | FieldValidationErrors<T>, message?: string
  ): ApplicationErrorEntity<T> => 
    new ApplicationErrorEntity<T>(origin, payload, message)
  
  generateInfrastructureError = (origin: InfrastructureErrorOrigin | InfrastructureErrorOrigin[], payload: InfrastructureErrorPayload, message?: string): InfrastructureErrorEntity => 
    new InfrastructureErrorEntity(origin, payload, message)
  
  generateMiscellaneousError = (origin: MiscellaneousErrorOrigin | MiscellaneousErrorOrigin[], payload: MiscellaneousErrorPayload, message?: string): MiscellaneousErrorEntity => 
    new MiscellaneousErrorEntity(origin, payload, message)
  
  generateApplicationErrorMessage = <E extends Record<T, string>, T extends keyof E> (errorMessages: E, errorType: T, additionalMessage?: string): string => 
    `${errorMessages[errorType]}${additionalMessage ? `: ${additionalMessage}` : ''}` || 'Unknown error occurred.'
  
  isSystemError = (error: unknown): error is SystemError => 
    typeof error === 'object' && error !== null &&
      'type' in error &&
      'origin' in error &&
      'payload' in error


  errorServiceMap = {
    Domain: this.generateDomainError,
    Application: this.generateApplicationError,
    Infrastructure: this.generateInfrastructureError,
    Miscellaneous: this.generateMiscellaneousError,
  }  
}

export const errorService = new ErrorService() // Singleton instead implementing a DI Container into the app
