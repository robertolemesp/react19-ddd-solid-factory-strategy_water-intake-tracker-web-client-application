
import  { type UserDayHydrationSummaryServiceInterface, UserDayHydrationSummaryServiceErrors, userDayHydrationSummaryServiceErrorMessages } from './model'

import type { UserDayHydrationSummaryRetrievalDto, UserDayHydrationSummaryRetrievalDtoResult } from '@/application/dto/user-day-hydration-summary/retrieval'
import type { ApplicationErrorOrigin } from '@/domain/error/model'

import { UserEntity } from '@/domain/user/entity'
import { WaterIntakeEntity } from '@/domain/water-intake/entity'

import { UserDayHydrationSummaryDtoValidator } from '@/application/dto/user-day-hydration-summary/validator'
import { UserMapper } from '@/application/dto/user/mapper'
import { WaterIntakeMapper } from '@/application/dto/water-intake/mapper'
import { errorService } from '@/application/services/error'

import HttpClient from '@/infrastructure/api/http-client'

export class UserDayHydrationSummaryService implements UserDayHydrationSummaryServiceInterface {
  private httpClient = HttpClient.getInstance()
  private readonly userDayHydrationSummaryDtoValidator = new UserDayHydrationSummaryDtoValidator()

  private ERROR_ORIGIN: ApplicationErrorOrigin = 'UserDayHydrationSummary'

  constructor() {}

  async retrieveUserDayHydrationSummary(
    userDayHydrationSummaryRetrievalDto: UserDayHydrationSummaryRetrievalDto, byPassWhenNotFound: boolean = false
  ): Promise<{ 
    user: UserEntity, 
    waterIntake: WaterIntakeEntity | null 
  } | false> {
    
    const userDayHydrationSummaryRetrievalDtoErrors = this.userDayHydrationSummaryDtoValidator.validateRetrievalDto(userDayHydrationSummaryRetrievalDto)

    if (userDayHydrationSummaryRetrievalDtoErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        userDayHydrationSummaryRetrievalDtoErrors, 
        errorService.generateApplicationErrorMessage(
          userDayHydrationSummaryServiceErrorMessages,
          UserDayHydrationSummaryServiceErrors.RETRIEVE, 
          'Invalid User Day Hydration Summary retrieval DTO'
        )
      )
    
    let userDayHydrationSummaryRetrievalDtoResult = {} as UserDayHydrationSummaryRetrievalDtoResult

    try {
      const { data } = await this.httpClient.get<UserDayHydrationSummaryRetrievalDtoResult>(
        `/user-hydration-summary/${userDayHydrationSummaryRetrievalDto.userEmail}`
      )

      userDayHydrationSummaryRetrievalDtoResult = data
    } catch (error) {
      // business rule for this case is check user existance from result of this api route, but this is not a good practice 
      // and don't map http response codes in infra error entity error codes as well
      const NOT_FOUND_ERR_MSG = 'Request failed with status code 404'
      if (byPassWhenNotFound && errorService.isSystemError(error) && error.message === NOT_FOUND_ERR_MSG)  
        return false  
    }
    
    const userDayHydrationSummaryRetrievalDtoResultErrors = this.userDayHydrationSummaryDtoValidator.validateDto(userDayHydrationSummaryRetrievalDtoResult)

    if (userDayHydrationSummaryRetrievalDtoResultErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        userDayHydrationSummaryRetrievalDtoErrors, 
        errorService.generateApplicationErrorMessage(
          userDayHydrationSummaryServiceErrorMessages, 
          UserDayHydrationSummaryServiceErrors.RETRIEVE, 
          'Invalid User Day Hydration Summary retrieval result DTO'
        )
      )

    const userEntityCreationResult = UserMapper.toDomain(userDayHydrationSummaryRetrievalDtoResult.user)

    if (userEntityCreationResult.isFailure)
      throw errorService.generateDomainError('User', userEntityCreationResult.getErrorOrThrow())

    let waterIntake = null

    if (userDayHydrationSummaryRetrievalDtoResult.waterIntake) {
      const waterIntakeEntityCreationResult = WaterIntakeMapper.toDomain(userDayHydrationSummaryRetrievalDtoResult.waterIntake)

      if (waterIntakeEntityCreationResult.isFailure)
        throw errorService.generateDomainError('WaterIntake', waterIntakeEntityCreationResult.getErrorOrThrow())

      waterIntake = waterIntakeEntityCreationResult.getValueOrThrow()
    }

    return {
      user: userEntityCreationResult.getValueOrThrow(),
      waterIntake 
    }
  }
}
