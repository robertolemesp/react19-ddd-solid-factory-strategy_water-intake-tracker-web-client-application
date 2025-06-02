import type { Result } from '@/domain/_shared/result'
import type { FieldValidationErrors } from '@/domain/_shared/validation/model'

import type { UserDto } from '@/application/dto/user'
import type { UserCreationDto } from '@/application/dto/user/creation'

import { UserEntity } from '@/domain/user/entity'

export const UserMapper = {
  toDomain: (userDto: UserDto): Result<UserEntity, FieldValidationErrors<UserEntity>> => UserEntity.create(userDto),

  toDto: (userEntity: UserEntity): UserDto => userEntity,

  formDataToCreationDto: (formData: Record<keyof UserCreationDto, unknown>): UserCreationDto => ({
    name: formData.name as string,
    email: formData.email as string,
    weightKg: Number(formData.weightKg)
  })
}
