import type { FieldValidator } from '@/domain/_shared/validation/model'

import { WaterIntakeEntity } from '@/domain/water-intake/entity'

import { validateDomainEntity } from '@/domain/_shared/validation/services/validators/entity'
import { RequiredValidator, NumberValidator, DateValidator, BooleanValidator } from '@/domain/_shared/validation/services/validators/types/index'

export class WaterIntakeDomainValidator {
  constructor() {}

  static validateEntity(waterIntake: WaterIntakeEntity) {
    const fieldValidators: Record<keyof WaterIntakeEntity, FieldValidator[]> = {
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
  
    return validateDomainEntity<WaterIntakeEntity>(waterIntake, fieldValidators)
  }
}
