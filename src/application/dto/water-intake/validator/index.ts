import type { FieldValidationErrors, FieldValidator } from '@/domain/_shared/validation/model'
import type { WaterIntakeDto } from '..'
import type { WaterIntakeCreationDto } from '../creation'
import type { WaterIntakesRetrievalDto } from '../retrieval'

import { RequiredValidator, NumberValidator, DateValidator, BooleanValidator } from '@/domain/_shared/validation/services/validators/types'
import { ValidationService } from '@/application/services/validation'

export class WaterIntakeDtoValidator {
  private readonly validationService = new ValidationService()

  constructor() {}

  validateDto(waterIntakeDto: WaterIntakeDto): FieldValidationErrors<WaterIntakeDto> {
    const fieldValidators: Record<keyof WaterIntakeDto, FieldValidator[]> = {
      id: [
        new RequiredValidator()
      ],
      userId: [
        new RequiredValidator()
      ],
      ml: [
        new RequiredValidator(),
        new NumberValidator(1)
      ],
      remainingMlToGoal: [
        new NumberValidator()
      ],
      isGoalAchieved: [
        new BooleanValidator()
      ],
      goalAverage: [
        new NumberValidator(0)
      ],
      date: [
        new DateValidator()
      ]
    }
  
    return this.validationService.validateDtoByFieldValidators<WaterIntakeDto>(waterIntakeDto, fieldValidators)
  }

  validateCreationDto(waterIntakeCreationDto: WaterIntakeCreationDto): FieldValidationErrors<WaterIntakeCreationDto> {
    const fieldValidators: Record<keyof WaterIntakeCreationDto, FieldValidator[]> = {
      userId: [
        new RequiredValidator()
      ],
      userDailyGoalMl: [
        ...(waterIntakeCreationDto.userDailyGoalMl ? [ new NumberValidator(1) ] : [])
      ],
      ml: [
        new RequiredValidator(),
        new NumberValidator(1)
      ]
    }

    return this.validationService.validateDtoByFieldValidators<WaterIntakeCreationDto>(waterIntakeCreationDto, fieldValidators)
  }

  validateRetrievalDto(waterIntakeRetrievalDto: WaterIntakesRetrievalDto): FieldValidationErrors<WaterIntakesRetrievalDto> {
    const fieldValidators: Record<keyof WaterIntakesRetrievalDto, FieldValidator[]> = {
      userId: [
        new RequiredValidator()
      ]
    }
  
    return this.validationService.validateDtoByFieldValidators<WaterIntakesRetrievalDto>(waterIntakeRetrievalDto, fieldValidators)
  }

  validateWaterIntakeDtos(waterIntakeDtos: WaterIntakeDto[]): FieldValidationErrors<WaterIntakeDto>[] {
    const errors: FieldValidationErrors<WaterIntakeDto>[] = []

    waterIntakeDtos.forEach(waterIntakeDto => {
      const waterIntakeDtoErrors = this.validateDto(waterIntakeDto)
      if (errors.length)
        errors.push(waterIntakeDtoErrors)
    })

    return errors
  }
}
