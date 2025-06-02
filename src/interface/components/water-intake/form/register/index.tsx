import { type FC, type JSX, useState } from 'react'

import type { WaterIntakeCreationDto } from '@/application/dto/water-intake/creation'
import type { FieldValidationError } from '@/domain/_shared/validation/model'

import { userStore, waterIntakeStore } from '@/application/store'

import { WaterIntakeService } from '@/application/services/water-intake'
import { WaterIntakeMapper } from '@/application/dto/water-intake/mapper'
import { errorService } from '@/application/services/error'
import { isApplicationErrorOfValidationError } from '@/domain/_shared/validation/services/type-guards/is-validation-error-payload'

import { formFieldHasError } from '@/utils/form'
import { mergeClassNames } from '@/utils/classname'
import { mapArrayItemPropertiesValuesByKey } from '@/utils/array'

import Form from '@/interface/components/_shared/ui/form'
import FormFieldErrorGroup from '@/interface/components/_shared/ui/form/error/group'
import FormRadioGroup from '@/interface/components/_shared/ui/form/radio/group'

export interface RegisterFormProps {
  className?: string
}

const WaterIntakeRegisterForm: FC<RegisterFormProps> = ({ className }): JSX.Element => {
  const { state: { user } } = userStore()
  const { state: { waterIntake }, dispatch: waterIntakeDispatch } = waterIntakeStore()

  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false)
  const [ fieldErrors, setFieldErrors ] = useState<FieldValidationError<WaterIntakeCreationDto>[]>([])

  const fieldHasError = (fieldName: keyof WaterIntakeCreationDto) => 
    formFieldHasError<WaterIntakeCreationDto>(fieldName, mapArrayItemPropertiesValuesByKey('fieldName', fieldErrors))
     
  const handleFormSubmit = async (data: WaterIntakeCreationDto) => {

    setIsSubmitting(true)
    
    // Performance: strategy to send user data in following usecase is adopted in order to reduce api resources usage 
    // (accordingly the consideration of the business rules for this system)
    data.userId = user!.id 
    if (!waterIntake)
      data.userDailyGoalMl = user!.dailyGoalMl

    const waterIntakeService = new WaterIntakeService()

    
    try {
      const mappedWaterIntakeCreationDto = WaterIntakeMapper.formDataToCreationDto(data)

      const savedWaterIntake = await waterIntakeService.createWaterIntake(mappedWaterIntakeCreationDto)

      const storeActionPrefix = waterIntake ? 'UPDATE' : 'SET'

      waterIntakeDispatch({ type: `${storeActionPrefix}_TODAY_WATER_INTAKE`, payload: savedWaterIntake })
      waterIntakeDispatch({ type: `${storeActionPrefix}_WATER_INTAKES`, payload: savedWaterIntake })
        
    } catch (error) {
      if (errorService.isSystemError(error)) {
        if (isApplicationErrorOfValidationError<WaterIntakeCreationDto>(error.payload)) {
          setFieldErrors(error.payload as FieldValidationError<WaterIntakeCreationDto>[])
          return
        }

        setFieldErrors([])
        alert(error.message) 
      }
          
    } finally {
      setIsSubmitting(false)
    }    
  }

  return <Form<WaterIntakeCreationDto>
    className={
      mergeClassNames('flex flex-col justify-center h-full w-full gap-y-6', className)
    }
    submitClassName='credentials-form-submit w-full text-md'
    submitTitle='Registrar'
    onSubmit={handleFormSubmit}
    isSubmitting={isSubmitting}
  >
    <FormRadioGroup 
      label='Registrar consumo'
      labelClassName='text-lg'
      name='ml'
      options={[
        { label: 'Copo pequeno 250ml', value: 250 },
        { label: 'Copo médio 350ml', value: 350 },
        { label: 'Garrafa média 500ml', value: 500 },
      ]}
      error={fieldHasError('ml')}
    />
    <FormFieldErrorGroup fieldErrors={fieldErrors} fieldName='ml' />
  </Form>
}

export default WaterIntakeRegisterForm
