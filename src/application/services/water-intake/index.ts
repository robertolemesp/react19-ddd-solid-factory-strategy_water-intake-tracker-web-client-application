
import  { type WaterIntakeServiceInterface, WaterIntakeServiceErrors, waterIntakeServiceErrorMessages  } from './model'

import type { WaterIntakeDto } from '@/application/dto/water-intake'
import type { WaterIntakesRetrievalDto, WaterIntakesRetrievalDtoResult } from '@/application/dto/water-intake/retrieval'
import type { WaterIntakeCreationDto, WaterIntakeCreationResultDto } from '@/application/dto/water-intake/creation'
import type { ApplicationErrorOrigin } from '@/domain/error/model'

import { WaterIntakeDtoValidator } from '@/application/dto/water-intake/validator'
import { WaterIntakeMapper } from '@/application/dto/water-intake/mapper'
import { errorService } from '@/application/services/error'

import HttpClient from '@/infrastructure/api/http-client'


export class WaterIntakeService implements WaterIntakeServiceInterface {
  private readonly waterIntakeDtoValidator = new WaterIntakeDtoValidator()
  private httpClient = HttpClient.getInstance()

  private readonly ERROR_ORIGIN: ApplicationErrorOrigin = 'User'

  constructor() {}
  
  async createWaterIntake(waterIntakeCreationDto: WaterIntakeCreationDto): Promise<WaterIntakeDto> {
    const waterIntakeCreationDtoErrors = this.waterIntakeDtoValidator.validateCreationDto(waterIntakeCreationDto)

    if (waterIntakeCreationDtoErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        waterIntakeCreationDtoErrors, 
        errorService.generateApplicationErrorMessage(waterIntakeServiceErrorMessages, WaterIntakeServiceErrors.CREATE, 'Invalid Water Intake creation DTO')
      )
    
    
    const { userId, ml, userDailyGoalMl } = waterIntakeCreationDto
    const { data: waterIntakeDtoResult } = await this.httpClient.post<WaterIntakeCreationResultDto>(
      `/water-intake/${userId}/register`, { 
        ml, 
        ...userDailyGoalMl && { userDailyGoalMl } 
      }
    )

    const waterIntakeDtoResultErrors = this.waterIntakeDtoValidator.validateDto(waterIntakeDtoResult)

    if (waterIntakeDtoResultErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        waterIntakeDtoResultErrors, 
        errorService.generateApplicationErrorMessage(waterIntakeServiceErrorMessages, WaterIntakeServiceErrors.CREATE, 'Invalid Water Intake creation result DTO')
      )

    const result = WaterIntakeMapper.toDomain(waterIntakeDtoResult)
    
    if (result.isFailure)
      throw errorService.generateDomainError('User', result.getErrorOrThrow())
    
    return result.getValueOrThrow()

  }

  async getWaterIntakesByUser(waterIntakeRetrievalDto: WaterIntakesRetrievalDto): Promise<WaterIntakeDto[]> {
    const waterIntakeRetrievalDtoErrors = this.waterIntakeDtoValidator.validateRetrievalDto(waterIntakeRetrievalDto)

    if (waterIntakeRetrievalDtoErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        waterIntakeRetrievalDtoErrors, 
        errorService.generateApplicationErrorMessage(waterIntakeServiceErrorMessages, WaterIntakeServiceErrors.CREATE, 'Invalid Water Intake retrieval DTO')
      )


    const { data: waterIntakesRetrievalDtoResult } = await this.httpClient.get<WaterIntakesRetrievalDtoResult>(`/water-intake/${waterIntakeRetrievalDto.userId}/history`)

    const waterIntakeRetrievalDtosErrors = this.waterIntakeDtoValidator.validateWaterIntakeDtos(waterIntakesRetrievalDtoResult)
    
    if (waterIntakeRetrievalDtosErrors.length)
      throw errorService.generateApplicationError(
        this.ERROR_ORIGIN, 
        waterIntakeRetrievalDtosErrors, 
        errorService.generateApplicationErrorMessage(waterIntakeServiceErrorMessages, WaterIntakeServiceErrors.CREATE, 'Invalid Water Intake DTO List')
      )
      
    return waterIntakesRetrievalDtoResult.map(waterIntakeDto => {
      const result = WaterIntakeMapper.toDomain(waterIntakeDto)

      if (result.isFailure) 
        throw errorService.generateDomainError('WaterIntake', result.getErrorOrThrow())

      return result.getValueOrThrow()
    })
  }
}
