export type DomainErrorOrigin = 'User' | 'WaterIntake'
export type ApplicationErrorOrigin = 'User' | 'WaterIntake' | 'UserDayHydrationSummary'
export type InfrastructureErrorOrigin = 'Api'
export type MiscellaneousErrorOrigin = 'Miscellaneous'

export type ErrorOriginType =
  | DomainErrorOrigin
  | ApplicationErrorOrigin
  | InfrastructureErrorOrigin
  | MiscellaneousErrorOrigin

export type ErrorOrigin =
  | ErrorOriginType
  | ErrorOriginType[]
  | Array<ErrorOriginType | ErrorOriginType[]>

export type ErrorType = 'Domain' | 'Application' | 'Infrastructure' | 'Miscellaneous'
export type ErrorTitle = string

export type DomainErrorPayload = unknown 
export type ApplicationErrorPayload = unknown
export type InfrastructureErrorPayload = unknown
export type MiscellaneousErrorPayload = unknown

export type SystemErrorPayload =
  | DomainErrorPayload
  | ApplicationErrorPayload
  | InfrastructureErrorPayload
  | MiscellaneousErrorPayload
  | Error

export interface SystemError {
  type: ErrorType
  origin: ErrorOrigin
  message?: string
  payload: SystemErrorPayload
}

export type ErrorServiceMap = (
  origin: ErrorOrigin, 
  payload: DomainErrorPayload | ApplicationErrorPayload | InfrastructureErrorPayload | MiscellaneousErrorPayload,
  message?: string
) => unknown
