
import type { FC, JSX } from 'react'

import { UserContextProvider, WaterIntakeContextProvider } from '@/application/store'
import StoreComposer from '@/application/store/_composer'

import Router from './router'

const App: FC = (): JSX.Element => 
  <StoreComposer contextProviderComponents={[ UserContextProvider, WaterIntakeContextProvider ]}>
    <Router />
  </StoreComposer>
  
export default App
