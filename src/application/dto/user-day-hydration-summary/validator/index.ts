import type { FieldValidationErrors, FieldValidator } from '@/domain/_shared/validation/model'
import type { UserDayHydrationSummaryDto } from '..'
import type { UserDayHydrationSummaryRetrievalDto } from '../retrieval'

import { UserDtoValidator } from '@/application/dto/user/validator'
import { WaterIntakeDtoValidator } from '@/application/dto/water-intake/validator'

import { RequiredValidator, PatternMismatchValidator } from '@/domain/_shared/validation/services/validators/types'

import { ValidationService } from '@/application/services/validation'

export class UserDayHydrationSummaryDtoValidator {
  private readonly validationService = new ValidationService()
  private readonly userDtoValidator = new UserDtoValidator()
  private readonly waterIntakeDtoValidator = new WaterIntakeDtoValidator()

  constructor() {}

  validateDto({ user, waterIntake }: UserDayHydrationSummaryDto): FieldValidationErrors<
    [UserDayHydrationSummaryDto['user'], UserDayHydrationSummaryDto['waterIntake']]
  > {
    return this.validationService.composeValidators<[UserDayHydrationSummaryDto['user'], UserDayHydrationSummaryDto['waterIntake']]>(
      user => this.userDtoValidator.validateDto(user),
      waterIntake => waterIntake ? 
        this.waterIntakeDtoValidator.validateDto(waterIntake) as FieldValidationErrors<UserDayHydrationSummaryDto['waterIntake']>
      : 
        []
    )(user, waterIntake)
  }

  validateRetrievalDto(userDayHydrationSummaryRetrievalDto: UserDayHydrationSummaryRetrievalDto): FieldValidationErrors<UserDayHydrationSummaryRetrievalDto> {
    const fieldValidators: Record<keyof UserDayHydrationSummaryRetrievalDto, FieldValidator[]> = {
      userEmail: [
        new RequiredValidator(),
        new PatternMismatchValidator(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/)
      ]
    }
  
    return this.validationService.validateDtoByFieldValidators<UserDayHydrationSummaryRetrievalDto>(
      userDayHydrationSummaryRetrievalDto, 
      fieldValidators
    )
  }
}
