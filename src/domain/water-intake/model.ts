export interface WaterIntake {
  id: string
  userId: string
  date: string
  ml: number
  goalAverage: number
  remainingMlToGoal: number
  isGoalAchieved: boolean
}
