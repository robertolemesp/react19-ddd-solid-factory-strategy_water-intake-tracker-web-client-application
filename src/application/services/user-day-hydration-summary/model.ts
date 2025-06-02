
import type { UserDayHydrationSummaryDto } from '@/application/dto/user-day-hydration-summary'
import type { UserDayHydrationSummaryRetrievalDto } from '@/application/dto/user-day-hydration-summary/retrieval'

export interface UserDayHydrationSummaryServiceInterface {
  retrieveUserDayHydrationSummary(userCreationDto: UserDayHydrationSummaryRetrievalDto): Promise<UserDayHydrationSummaryDto | false>
}

export enum UserDayHydrationSummaryServiceErrors {
  RETRIEVE = 'RETRIEVE',
}

export const userDayHydrationSummaryServiceErrorMessages: Record<UserDayHydrationSummaryServiceErrors, string> = {
  [UserDayHydrationSummaryServiceErrors.RETRIEVE]: `Failed to retrieve User's day hydration summary`,
}
