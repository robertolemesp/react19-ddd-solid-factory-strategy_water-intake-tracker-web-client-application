import type { JSX } from 'react'
import type { FieldValidationError } from '@/domain/_shared/validation/model'

import FormFieldError from '@/interface/components/_shared/ui/form/error/field'

import { mergeClassNames } from '@/utils/classname'

interface FormFieldErrorsProps<T> {
  className?: string
  fieldErrors: FieldValidationError<T>[]
  fieldName: keyof T
}

const FormFieldErrorGroup = <T,>({ className, fieldErrors, fieldName}: FormFieldErrorsProps<T>): JSX.Element | null => {
  const fieldError = fieldErrors.find(error => error.fieldName === fieldName)

  if (!fieldError) 
    return null

  return <div className={mergeClassNames('flex flex-col', className)}>
    { fieldError.errorMessages.map((errorMessage, i) => 
      <FormFieldError key={i}>{ errorMessage }</FormFieldError> 
    )}
  </div> 
}

export default FormFieldErrorGroup
