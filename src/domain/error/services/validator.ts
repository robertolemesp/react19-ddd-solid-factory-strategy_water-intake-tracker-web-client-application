import type { SystemError } from '../model'

export class ErrorDomainValidator {
  constructor() {}

  static validateEntity({ type, origin, payload }: SystemError) {
    if (!type) 
      throw new Error('Error type is required')
    
    if (origin && (Array.isArray(origin) && !origin.length)) 
       throw new Error('Origin array cannot be empty')

    if (!payload || typeof payload !== 'object' || Object.keys(payload).length === 0) 
      throw new Error('Payload must be a non-empty object')
  }
}
