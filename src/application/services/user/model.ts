import type { UserCreationDto } from '@/application/dto/user/creation'
import { UserEntity } from '@/domain/user/entity'

export enum UserServiceErrors {
  CREATE = 'CREATE',
}

export const userServiceErrorMessages: Record<UserServiceErrors, string> = {
  [UserServiceErrors.CREATE]: `Failed to create User`,
}

export interface UserServiceInterface {
  createUser(userCreationDto: UserCreationDto): Promise<UserEntity>
}
