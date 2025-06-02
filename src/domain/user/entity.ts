import type { User } from './model'
import type { FieldValidationErrors } from '@/domain/_shared/validation/model'
import { Result } from '@/domain/_shared/result'

import { UserDomainValidator } from './services/validation'

export class UserEntity implements User {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly weightKg: number
  public readonly dailyGoalMl: number

  private constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.weightKg = user.weightKg
    this.dailyGoalMl = user.dailyGoalMl
  }

  static create(user: User): Result<UserEntity, FieldValidationErrors<User>> {
    const errors = UserDomainValidator.validateEntity(user)
    
    if (errors) 
      return Result.failure(errors)

    return Result.success(new UserEntity(user))
  }
}
