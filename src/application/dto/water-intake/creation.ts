
import type { WaterIntake } from '@/domain/water-intake/model'

export type WaterIntakeCreationDto = Pick<WaterIntake, 'userId' | 'ml'> & { userDailyGoalMl?: number }

export type WaterIntakeCreationResultDto = WaterIntake
