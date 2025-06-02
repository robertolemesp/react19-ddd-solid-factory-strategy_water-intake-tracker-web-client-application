import type { UserDto } from '..'
import type { UserCreationDto } from '../creation'
import type { FieldValidationErrors, FieldValidator } from '@/domain/_shared/validation/model'
import { 
  RequiredValidator, NumberValidator, TooShortValidator, TooLongValidator, PatternMismatchValidator 
} from '@/domain/_shared/validation/services/validators/types'

import { ValidationService } from '@/application/services/validation'

export class UserDtoValidator {
  private readonly validationService = new ValidationService()

  constructor() {}

  validateDto(userDto: UserDto): FieldValidationErrors<UserDto> {
    const fieldValidators: Record<keyof UserDto, FieldValidator[]> = {
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
  
    return this.validationService.validateDtoByFieldValidators<UserDto>(userDto, fieldValidators)
  }

  validateCreationDto(userCreationDto: UserCreationDto): FieldValidationErrors<UserCreationDto> {
    const fieldValidators: Record<keyof UserCreationDto, FieldValidator[]> = {
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
    }
  
    return this.validationService.validateDtoByFieldValidators<UserCreationDto>(userCreationDto, fieldValidators)
  }
}
