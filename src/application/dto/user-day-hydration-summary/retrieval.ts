import type { UserDayHydrationSummaryDto } from '.'
import type { User } from '@/domain/user/model'


export type UserDayHydrationSummaryRetrievalDto = {
  userEmail: User['email']
}

export type UserDayHydrationSummaryRetrievalDtoResult = UserDayHydrationSummaryDto