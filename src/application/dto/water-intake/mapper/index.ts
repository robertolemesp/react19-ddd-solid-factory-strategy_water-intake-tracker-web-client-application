import type { Result } from '@/domain/_shared/result'
import type { FieldValidationErrors } from '@/domain/_shared/validation/model'
import type { WaterIntakeDto } from '@/application/dto/water-intake'
import type { WaterIntakeCreationDto } from '@/application/dto/water-intake/creation'

import { WaterIntakeEntity } from '@/domain/water-intake/entity'

export const WaterIntakeMapper = {
  toDomain: (waterIntakeDto: WaterIntakeDto): Result<WaterIntakeEntity, FieldValidationErrors<WaterIntakeEntity>> => WaterIntakeEntity.create(waterIntakeDto),
  
  toDto: (waterIntakeEntity: WaterIntakeEntity): WaterIntakeDto => waterIntakeEntity,

  formDataToCreationDto: ({ userId, userDailyGoalMl, ml }: Record<string, unknown>): WaterIntakeCreationDto => ({
    userId: userId as string,
    ...(userDailyGoalMl as string) && { userDailyGoalMl: Number(userDailyGoalMl) },
    ml: Number(ml)
  })
}
