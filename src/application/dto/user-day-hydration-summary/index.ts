import type { UserDto } from '@/application/dto/user'
import type { WaterIntakeDto } from '@/application/dto/water-intake'

export type UserDayHydrationSummaryDto = {
  user: UserDto
  waterIntake: WaterIntakeDto | null
}
