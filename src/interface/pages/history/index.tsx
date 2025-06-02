
import { useState, type FC, type JSX } from 'react'
import { Link } from 'react-router'

import type { WaterIntakeDto } from '@/application/dto/water-intake'


import { userStore, waterIntakeStore } from '@/application/store'

import { WaterIntakeMapper } from '@/application/dto/water-intake/mapper'

import WaterIntakeSummary from '@/interface/components/water-intake/summary'
import Typography from '@/interface/components/_shared/ui/typography'

import Form from '@/interface/components/_shared/ui/form'
import FormInput from '@/interface/components/_shared/ui/form/input'

interface FilterFormData {
  date: string
}

const HistoryPage: FC = (): JSX.Element => {
  const { state: { user } } = userStore()
  const { state: { waterIntakes } } = waterIntakeStore()

  // taking advantage of react 19 auto-memoization, useMemo is no longer needed and we would apply it to avoid list conversion in every re-render
  const waterIntakeDtos = waterIntakes.map(WaterIntakeMapper.toDto) 

  const [ filteredWaterIntakes, setFilteredWaterIntakes ] = useState<WaterIntakeDto[]>(waterIntakes.map(WaterIntakeMapper.toDto))
 
  const handleFilterFormSubmit = ({ date }: FilterFormData) => {
    if (!date) {
      setFilteredWaterIntakes(waterIntakeDtos)
      return
    }
    
    setFilteredWaterIntakes(waterIntakeDtos.filter(waterIntakeDto => waterIntakeDto.date === date))
  }

  const handleFilterClearSpanClick = () => setFilteredWaterIntakes(waterIntakeDtos)

  return <section className='flex flex-col items-center py-3 overflow-y-auto relative'>
    <Typography as='h1' className='fluid-text-xl'>Histórico</Typography>
    <Typography as='h2' size='lg' className='mb-5 text-gray-600'>{ user?.name }</Typography>
    { waterIntakeDtos.length ? 
      <>
        { filteredWaterIntakes.map((waterIntake, i) => 
          <WaterIntakeSummary 
            key={i} 
            className='mt-5 w-[98%] max-w-md' 
            type='history' 
            userDailyGoalMl={user!.dailyGoalMl} 
            waterIntake={waterIntake} 
          /> 
        )}

        <Typography as='h2' size='lg' className='mt-12 text-gray-600'>Visualizar por data:</Typography>
        <Form<FilterFormData>
          className='flex flex-col justify-center mt-6 h-full w-[98%] max-w-md gap-y-6'
          submitClassName='credentials-form-submit w-full text-md'
          submitTitle='Filtrar'
          onSubmit={handleFilterFormSubmit}
        >
          <FormInput 
            name='date'
            placeholder='Forneça a data'
            type='date'
          />
        </Form>
        <span className='mt-2 underline cursor-pointer' onClick={handleFilterClearSpanClick}>Limpar filtro</span>
      </> 
    : 
      <Typography className='mt-12 italic' as='p'>Ainda não consta registro de consumo de água.</Typography> 
    }
    <Link className='absolute right-0 top-0 underline' to='/'>Voltar</Link>
  </section>
}
  
export default HistoryPage
