import { WaterIntakeState, WaterIntakeAction } from '../models'

import { WaterIntakeEntity } from '@/domain/water-intake/entity'

export const waterIntakeInitialState: WaterIntakeState = {
  waterIntake: null,
  waterIntakes: [],
}

export const waterIntakeReducer = (state: WaterIntakeState, action: WaterIntakeAction): WaterIntakeState => {
  switch (action.type) {
    case 'SET_TODAY_WATER_INTAKE':
      return { ...state, waterIntake: action.payload }

    case 'UPDATE_TODAY_WATER_INTAKE':
      return { ...state, waterIntake: action.payload }

    case 'REMOVE_WATER_INTAKE':
      return { ...state, waterIntake: null }

    case 'SET_WATER_INTAKES':
      return {
        ...state,
        waterIntakes: Array.isArray(action.payload)
          ? [ ...state.waterIntakes, ...action.payload ]
          : [ ...state.waterIntakes, action.payload ]
      }

    case 'UPDATE_WATER_INTAKES':
      return {
        ...state,
        waterIntakes: state.waterIntakes.map(waterIntake => waterIntake.id === action.payload.id ? action.payload : waterIntake),
      }

    case 'REMOVE_WATER_INTAKES':
      return { ...state, waterIntakes: [] }

    default:
      return state
  }
}
