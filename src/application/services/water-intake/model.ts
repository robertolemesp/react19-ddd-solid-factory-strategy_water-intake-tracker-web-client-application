import type { WaterIntakeCreationDto } from '@/application/dto/water-intake/creation'
import type { WaterIntakesRetrievalDto } from '@/application/dto/water-intake/retrieval'

import { WaterIntakeEntity } from '@/domain/water-intake/entity'

export interface WaterIntakeServiceInterface {
  createWaterIntake(waterIntakeCreationDto: WaterIntakeCreationDto): Promise<WaterIntakeEntity>
  getWaterIntakesByUser(WaterIntakesRetrievalDto: WaterIntakesRetrievalDto): Promise<WaterIntakeEntity[]>
}

export enum WaterIntakeServiceErrors {
  CREATE = 'CREATE',
  GET_ALL_BY_USER = 'GET_ALL_BY_USER',
}

export const waterIntakeServiceErrorMessages: Record<WaterIntakeServiceErrors, string> = {
  [WaterIntakeServiceErrors.CREATE]: 'Failed to create water intake',
  [WaterIntakeServiceErrors.GET_ALL_BY_USER]: 'Failed to retrieve water intake history',
}
