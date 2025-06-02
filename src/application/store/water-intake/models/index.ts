import type { Dispatch } from 'react'

import { WaterIntakeEntity } from '@/domain/water-intake/entity'

export interface WaterIntakeState {
  waterIntake: WaterIntakeEntity | null
  waterIntakes: WaterIntakeEntity[]
}

export type WaterIntakeAction =
  | { type: 'SET_TODAY_WATER_INTAKE'; payload: WaterIntakeEntity }
  | { type: 'UPDATE_TODAY_WATER_INTAKE'; payload: WaterIntakeEntity }
  | { type: 'REMOVE_WATER_INTAKE' }
  | { type: 'SET_WATER_INTAKES'; payload: WaterIntakeEntity | WaterIntakeEntity[] }
  | { type: 'UPDATE_WATER_INTAKES'; payload: WaterIntakeEntity }
  | { type: 'REMOVE_WATER_INTAKES' }


export interface WaterIntakeContext {
  state: WaterIntakeState;
  dispatch: Dispatch<WaterIntakeAction>
}
