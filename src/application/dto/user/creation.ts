import type { User } from '@/domain/user/model'

export type UserCreationDto = Omit<User, 'id' | 'dailyGoalMl'>

export type UserCreationResultDto = User
