import type { FieldValidator } from '@/domain/_shared/validation/model'

import { UserEntity } from '@/domain/user/entity'

import { RequiredValidator, TooShortValidator, PatternMismatchValidator, TooLongValidator, NumberValidator } from '@/domain/_shared/validation/services/validators/types/index'
import { validateDomainEntity } from '@/domain/_shared/validation/services/validators/entity'

export class UserDomainValidator {
  constructor() {}

  static validateEntity(user: UserEntity) {
    const fieldValidators: Record<keyof UserEntity, FieldValidator[]> = {
      id: [ 
        new RequiredValidator()
      ],
      name: [
        new RequiredValidator(),
        new TooShortValidator(3),
        new TooLongValidator(255)
      ],
      email: [
        new RequiredValidator(),
        new PatternMismatchValidator(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/)
      ],
      weightKg: [
        new RequiredValidator(),
        new NumberValidator(1)
      ],
      dailyGoalMl: [
        new RequiredValidator(),
        new NumberValidator(1)
      ]
    }
  
    return validateDomainEntity<UserEntity>(user, fieldValidators)
  }
}
