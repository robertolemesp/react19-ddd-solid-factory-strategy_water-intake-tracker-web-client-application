import type { 
  SystemError, ErrorType, ErrorOrigin, DomainErrorPayload, ApplicationErrorPayload, InfrastructureErrorPayload, MiscellaneousErrorPayload, SystemErrorPayload 
} from '@/domain/error/model'

import type { FieldValidationErrors } from '@/domain/_shared/validation/model'

import { ErrorDomainValidator } from './services/validator'

export class ErrorEntity extends Error implements SystemError {
  public readonly type: ErrorType
  public readonly origin: ErrorOrigin
  public readonly payload: SystemErrorPayload

  constructor(systemError: SystemError) {
    const name = `${
      origin 
      ? Array.isArray(origin) ? origin.join(` ${systemError.type} and `) : `${systemError.origin} ${systemError.type}`
      : 'Unknown'
    } error`

    const _message = systemError.message || `${name} occurred`
      
    super(_message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.type = systemError.type
    this.origin = systemError.origin
    this.payload = systemError.payload
  }

  static create(systemError: SystemError): ErrorEntity {
    ErrorDomainValidator.validateEntity(systemError)
    return new ErrorEntity(systemError)
  }
}

export class DomainErrorEntity extends ErrorEntity {
  constructor(origin: ErrorOrigin, payload: DomainErrorPayload, message?: string) {
    super({ type: 'Domain', origin, payload, message })
  }
}

export class ApplicationErrorEntity<T> extends ErrorEntity {
  constructor(origin: ErrorOrigin, payload: ApplicationErrorPayload | FieldValidationErrors<T>, message?: string) {
    super({ type: 'Application', origin, payload, message })
  }
}

export class InfrastructureErrorEntity extends ErrorEntity {
  constructor(origin: ErrorOrigin, payload: InfrastructureErrorPayload, message?: string) {
    super({ type: 'Infrastructure', origin, payload, message })
  }
}

export class MiscellaneousErrorEntity extends ErrorEntity {
  constructor(origin: ErrorOrigin, payload: MiscellaneousErrorPayload, message?: string) {
    super({ type: 'Miscellaneous', origin, payload, message })
  }
}
