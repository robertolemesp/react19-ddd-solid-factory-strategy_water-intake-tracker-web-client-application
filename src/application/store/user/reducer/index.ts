import { UserState, UserAction } from '../models'

export const userInitialState: UserState = {
  user: null
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'REMOVE_USER':
      return { ...state, user: null }

    default:
      return state
  }
}
