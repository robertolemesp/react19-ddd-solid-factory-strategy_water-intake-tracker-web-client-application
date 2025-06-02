
import type { FC, JSX } from 'react'
import { Link } from 'react-router'

import { userStore, waterIntakeStore } from '@/application/store'

import { UserMapper } from '@/application/dto/user/mapper'
import { WaterIntakeMapper } from '@/application/dto/water-intake/mapper'

import Typography from '@/interface/components/_shared/ui/typography'
import WaterIntakeRegisterForm from '@/interface/components/water-intake/form/register'
import WaterIntakeSummary from '@/interface/components/water-intake/summary'

const MainPage: FC = (): JSX.Element => {
  const { state: { user } } = userStore()
  const { state: { waterIntake } } = waterIntakeStore()

  return <section className='flex flex-col items-center'>
    <Typography className='fluid-text-xl' weight='bold'>Data de hoje: { new Date().toLocaleDateString('pt-BR') }</Typography>
    <WaterIntakeRegisterForm className='mt-12 mx-auto max-w-md rounded-md ring-2 p-4 ring-black'/>
    { waterIntake && user && <WaterIntakeSummary 
      className='mt-16 w-full max-w-md' 
      type='day' 
      userDailyGoalMl={UserMapper.toDto(user).dailyGoalMl} 
      waterIntake={WaterIntakeMapper.toDto(waterIntake)} 
    />}
    <Link className='mt-16 underline' to='history'>Ver histórico</Link>
  </section>
}
  
export default MainPage
