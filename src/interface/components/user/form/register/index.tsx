import { type FC, type JSX, useState } from 'react'

import type { UserCreationDto } from '@/application/dto/user/creation'
import type { FieldValidationError } from '@/domain/_shared/validation/model'

import { userStore, waterIntakeStore } from '@/application/store'

import { UserService } from '@/application/services/user'
import { UserDayHydrationSummaryService } from '@/application/services/user-day-hydration-summary'
import { WaterIntakeService } from '@/application/services/water-intake'
import { UserMapper } from '@/application/dto/user/mapper'
import { errorService } from '@/application/services/error'
import { isApplicationErrorOfValidationError } from '@/domain/_shared/validation/services/type-guards/is-validation-error-payload'

import { formFieldHasError } from '@/utils/form'
import { mergeClassNames } from '@/utils/classname'
import { mapArrayItemPropertiesValuesByKey } from '@/utils/array'

import Form from '@/interface/components/_shared/ui/form'
import FormInput from '@/interface/components/_shared/ui/form/input'
import FormFieldErrorGroup from '@/interface/components/_shared/ui/form/error/group'


export interface UserRegisterFormProps {
  className?: string
  onSubmit: (success: boolean) => void
}

const UserRegisterForm: FC<UserRegisterFormProps> = ({ className, onSubmit }): JSX.Element => {
  const { dispatch: userDispatch } = userStore()
  const { dispatch: waterIntakeDispatch } = waterIntakeStore()

  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false)
  const [ fieldErrors, setFieldErrors ] = useState<FieldValidationError<UserCreationDto>[]>([])

  const fieldHasError = (fieldName: keyof UserCreationDto) => 
    formFieldHasError<UserCreationDto>(fieldName, mapArrayItemPropertiesValuesByKey('fieldName', fieldErrors))
     
  const handleFormSubmit = async (data: UserCreationDto) => {
    setIsSubmitting(true)
    
    const userDayHydrationSummaryService = new UserDayHydrationSummaryService()

    const byPassWhenUserNotFound = true
    const userDayHydrationSummary = await userDayHydrationSummaryService.retrieveUserDayHydrationSummary({ userEmail: data.email }, byPassWhenUserNotFound)

    try {
      if (userDayHydrationSummary && Object.keys(userDayHydrationSummary).length) {
        const { user, waterIntake } = userDayHydrationSummary 

        userDispatch({ type: 'SET_USER', payload: user })

        if (waterIntake) 
          waterIntakeDispatch({ type: 'SET_TODAY_WATER_INTAKE', payload: waterIntake })

        const waterInakeService = new WaterIntakeService()

        const waterIntakeHistory = await waterInakeService.getWaterIntakesByUser({ userId: user.id })

        if (waterIntakeHistory.length) 
          waterIntakeDispatch({ type: 'SET_WATER_INTAKES', payload: waterIntakeHistory })

        setIsSubmitting(false)
        onSubmit(true)

        return
      }

      const userService = new UserService()
      const userCreationDto = UserMapper.formDataToCreationDto(data)

      const createdUser = await userService.createUser(userCreationDto)

      userDispatch({ type: 'SET_USER', payload: createdUser })
      onSubmit(true)
    } catch (error) {
      if (errorService.isSystemError(error)) {
        if (isApplicationErrorOfValidationError<UserCreationDto>(error.payload)) {
          setFieldErrors(error.payload as FieldValidationError<UserCreationDto>[])
          return
        }

        setFieldErrors([])
        onSubmit(false)

        alert(error.message) 
      }
          
    } finally {
      setIsSubmitting(false)
    }    
  }

  return <Form<UserCreationDto>
    className={
      mergeClassNames('flex flex-col justify-center px-6 h-full w-full gap-y-6', className)
    }
    submitClassName='credentials-form-submit w-full text-md'
    submitTitle='Registrar ou Entrar com email'
    onSubmit={handleFormSubmit}
    isSubmitting={isSubmitting}
  >
    <FormInput 
      name='email'
      placeholder='Seu e-mail'
      type='text'
      error={fieldHasError('email')}
    />
    <FormFieldErrorGroup fieldErrors={fieldErrors} fieldName='email' />
    <FormInput 
      name='name'
      placeholder='Seu nome'
      type='text'
      error={fieldHasError('name')}
    />
    <FormFieldErrorGroup fieldErrors={fieldErrors} fieldName='name' />
    <FormInput 
      name='weightKg'
      placeholder='Seu peso (KG)'
      type='text'
      error={fieldHasError('weightKg')}
    />
    <FormFieldErrorGroup fieldErrors={fieldErrors} fieldName='weightKg' />
  </Form>
}

export default UserRegisterForm
