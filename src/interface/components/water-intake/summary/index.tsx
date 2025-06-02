
import type { FC, JSX, PropsWithChildren } from 'react'

import type { WaterIntakeDto } from '@/application/dto/water-intake'
import type { UserDto } from '@/application/dto/user'

import Typography from '@/interface/components/_shared/ui/typography'

import { mergeClassNames } from '@/utils/classname'
import { formatDateToBrazilianFormat } from '@/utils/date'

interface WaterIntakeSummaryProps {
  className?: string
  userDailyGoalMl: UserDto['dailyGoalMl']
  waterIntake: WaterIntakeDto
  type: 'day' | 'history'
}

const SummaryRow: FC<PropsWithChildren> = ({ children }) => <div className='flex justify-between w-full'>{ children }</div>

const WaterIntakeSummary: FC<WaterIntakeSummaryProps> = ({ className, userDailyGoalMl, waterIntake, type = 'day' }): JSX.Element => 
  <div className={mergeClassNames('flex flex-col items-center p-3 ring-2 ring-primary-600 rounded-md', className)}>
    { type === 'history' && <SummaryRow>
      <Typography weight='bold'>Data:</Typography>
      <Typography>{ formatDateToBrazilianFormat(waterIntake.date) }</Typography>
    </SummaryRow> }
    <SummaryRow>
      <Typography weight='bold'>Meta:</Typography>
      <Typography>{ userDailyGoalMl } ml</Typography>
    </SummaryRow>
    { type === 'day' && <SummaryRow>
      <Typography weight='bold'>Restante para a Meta:</Typography>
      <Typography>{ waterIntake.remainingMlToGoal } ml</Typography>
    </SummaryRow> }
    <SummaryRow>
      <Typography weight='bold'>Consumo:</Typography>
      <Typography>{ waterIntake.ml } ml</Typography>
    </SummaryRow>
    { type === 'day' && <SummaryRow>
      <Typography weight='bold'>Percentual da Meta:</Typography>
      <Typography>{ waterIntake.goalAverage }%</Typography>
    </SummaryRow> }
    <SummaryRow>
      <Typography weight='bold'>Meta atingida:</Typography>
      <Typography>{ waterIntake.isGoalAchieved ? 'Sim' : 'Não' }</Typography>
    </SummaryRow>
  </div>

  
export default WaterIntakeSummary
