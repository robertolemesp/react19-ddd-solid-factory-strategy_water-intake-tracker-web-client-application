import type { WaterIntakeDto } from '.'
import type { User } from '@/domain/user/model'

export type WaterIntakesRetrievalDto = {
  userId: User['id']
}

export type WaterIntakesRetrievalDtoResult = WaterIntakeDto[]