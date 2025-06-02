import { type FC, type PropsWithChildren, type JSX, createContext, useReducer, use } from 'react'

import type { WaterIntakeContext as IWaterIntakeContext } from '../models'

import { waterIntakeReducer, waterIntakeInitialState } from '../reducer'

const WaterIntakeContext = createContext<IWaterIntakeContext | null>(null)

export const WaterIntakeContextProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(waterIntakeReducer, waterIntakeInitialState)

  return <WaterIntakeContext value={{ state, dispatch }}>
    { children }
  </WaterIntakeContext>
}

export const waterIntakeStore = (): IWaterIntakeContext => {
  const context = use(WaterIntakeContext)

  if (!context) 
    throw new Error('useUserContext must be used within a WaterIntakeContextProvider')
  
  return context
}
