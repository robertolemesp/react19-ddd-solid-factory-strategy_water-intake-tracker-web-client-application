import type { Dispatch } from 'react'

import { UserEntity } from '@/domain/user/entity'

export interface UserState {
  user: UserEntity | null
}

export type UserAction = 
  | { type: 'SET_USER'; payload: UserEntity } 
  | { type: 'REMOVE_USER' }

export interface UserContext {
  state: UserState
  dispatch: Dispatch<UserAction>
}

