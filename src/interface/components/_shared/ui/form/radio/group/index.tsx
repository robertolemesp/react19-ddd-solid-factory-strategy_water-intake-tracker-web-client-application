import type { FC, JSX } from 'react'

import { mergeClassNames } from '@/utils/classname'

import FormRadioInput from '../input'

interface FormRadioGroupOption {
  label: string
  value: any
  disabled?: boolean 
  defaultChecked?: boolean
}

export interface FormRadioGroupProps {
  className?: string
  labelClassName?: string
  optionsContainerClassName?: string
  name: string
  options: FormRadioGroupOption[] | JSX.Element
  label?: string
  error?: boolean
}

const FormRadioGroup: FC<FormRadioGroupProps> = ({ className, labelClassName, optionsContainerClassName, name, options, label, error }): JSX.Element => 
  <fieldset className={mergeClassNames('space-y-2', className)}>
    { label && <legend className={mergeClassNames('text-sm font-medium mb-1', labelClassName)}>{ label }</legend> }
    { Array.isArray(options) ? options.map((option, i) => 
      <div className={mergeClassNames('flex items-center gap-2', optionsContainerClassName)} key={i}>
        <FormRadioInput 
          id={String(option.value)}
          name={name}
          label={option.label}
          className={className}
          disabled={option.disabled}
          defaultChecked={option.defaultChecked}
          value={option.value}
          error={error}
        />
      </div> )
    : 
      options 
    }
  </fieldset>
  
export default FormRadioGroup
