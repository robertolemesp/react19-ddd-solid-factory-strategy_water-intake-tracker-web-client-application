import { type FC, type JSX, type PropsWithChildren, type InputHTMLAttributes, useId } from 'react'
import { useFormContext } from 'react-hook-form'

import { mergeClassNames } from '@/utils/classname'

export interface FormRadioInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, PropsWithChildren {
  containerClassName?: string
  labelClassName?: string
  className?: string
  label: string
  checked?: boolean
  error?: boolean
}

const FormRadioInput: FC<FormRadioInputProps> = ({ id, name = '', containerClassName, labelClassName, className, label, checked, error, children, ...rest }): JSX.Element => {
  const { register } = useFormContext()
  const generatedId = useId()

  const _id = id || generatedId

  return <div className={`flex items-center ${containerClassName}`}>
    <div className='flex items-center'>
      <input
        { ...register(name) }
        id={_id}
        type='radio'
        className={mergeClassNames(
          `h-4 w-4 cursor-pointer rounded-full border border-input text-primary-600
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1
          ${
            error
              ? 'border-red-600 focus:ring-red-600 focus:border-red-600 ring-2 ring-red-600'
              : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
          }`,
          className,
        )}
        { ...rest }
      />
    </div>
    { children ||
      <label
        htmlFor={id}
        className={mergeClassNames(
          `ml-2 block text-sm font-medium cursor-pointer
          ${error ? 'text-red-600' : ''}`,
          labelClassName,
        )}
      >
        { label }
      </label>
    }
  </div>
  
}

export default FormRadioInput
