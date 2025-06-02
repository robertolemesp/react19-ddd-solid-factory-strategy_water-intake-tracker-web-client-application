import { type UserServiceInterface, userServiceErrorMessages, UserServiceErrors } from './model'

import type { UserCreationDto, UserCreationResultDto } from '@/application/dto/user/creation'
import type { ApplicationErrorOrigin } from '@/domain/error/model'

import { UserEntity } from '@/domain/user/entity'

import { UserDtoValidator } from '@/application/dto/user/validator'
import { UserMapper } from '@/application/dto/user/mapper'
import { errorService } from '@/application/services/error'

import HttpClient from '@/infrastructure/api/http-client'

export class UserService implements UserServiceInterface {
  private httpClient = HttpClient.getInstance()
  private readonly userDtoValidator = new UserDtoValidator()

  private readonly ERROR_ORIGIN: ApplicationErrorOrigin = 'User'

  constructor() {}

  async createUser(userCreationDto: UserCreationDto): Promise<UserEntity> {  
    const userCreationDtoErrors = this.userDtoValidator.validateCreationDto(userCreationDto)

    if (userCreationDtoErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        userCreationDtoErrors, 
        errorService.generateApplicationErrorMessage(userServiceErrorMessages, UserServiceErrors.CREATE, 'Invalid User creation DTO')
      )
    
    let createdUserDto: UserCreationResultDto
      
    try {
      const { data } = await this.httpClient.post<UserCreationResultDto>('/user', userCreationDto)

      createdUserDto = data
    } catch (err) {
      throw errorService.generateApplicationError(this.ERROR_ORIGIN, [], 'Failed to call API')
    }
    
    
    const userCreationResultDtoErrors = this.userDtoValidator.validateDto(createdUserDto)

    if (userCreationResultDtoErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        userCreationDtoErrors, 
        errorService.generateApplicationErrorMessage(userServiceErrorMessages, UserServiceErrors.CREATE, 'Invalid User creation result DTO')
      )

    const result = UserMapper.toDomain(createdUserDto)

    if (result.isFailure)
      throw errorService.generateDomainError('User', result.getErrorOrThrow())
    
    return result.getValueOrThrow()
  }
   
}
