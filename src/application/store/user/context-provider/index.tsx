import { type FC, type PropsWithChildren, type JSX, createContext, useReducer, use } from 'react'

import type { UserContext as IUserContext } from '../models'

import { userReducer, userInitialState } from '../reducer'

const UserContext = createContext<IUserContext | null>(null)

export const UserContextProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, userInitialState)

  return <UserContext value={{ state, dispatch }}>
    { children }
  </UserContext>
}

export const userStore = (): IUserContext => {
  const context = use(UserContext)

  if (!context) 
    throw new Error('userContext must be used within a UserContextProvider')
  
  return context
}
