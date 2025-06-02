import { WaterIntake } from './model'
import type { FieldValidationErrors } from '@/domain/_shared/validation/model'

import { Result } from '@/domain/_shared/result'
import { WaterIntakeDomainValidator } from './services/validation'

export class WaterIntakeEntity implements WaterIntake {
  public readonly id: string
  public readonly userId: string
  public readonly date: string
  public readonly ml: number
  public readonly remainingMlToGoal: number
  public readonly goalAverage: number
  public readonly isGoalAchieved: boolean

  constructor(waterIntake: WaterIntake) {
    this.id = waterIntake.id
    this.userId = waterIntake.userId
    this.date = waterIntake.date
    this.ml = waterIntake.ml
    this.remainingMlToGoal = waterIntake.remainingMlToGoal
    this.goalAverage = waterIntake.goalAverage
    this.isGoalAchieved = waterIntake.isGoalAchieved
  }

  static create(waterIntake: WaterIntake):  Result<WaterIntakeEntity, FieldValidationErrors<WaterIntakeEntity>> {
    const errors = WaterIntakeDomainValidator.validateEntity(waterIntake)
        
    if (errors) 
      return Result.failure(errors)
    
    return Result.success(new WaterIntakeEntity(waterIntake))
  }
}
