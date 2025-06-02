import type { InputHTMLAttributes, FC, JSX, PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'

import { mergeClassNames } from '@/utils/classname'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithChildren {
  containerClassName?: string
  error?: boolean
}

const FormInput: FC<FormInputProps> = ({ containerClassName = '', className = '', name = '', error, children, ...props }): JSX.Element => {
  const { register } = useFormContext()

  return <div className={`flex ${containerClassName}`}>
    <input
      { ...register(name) }
      className={mergeClassNames(
        `block w-full p-3 text-md rounded-md tracking-wider border border-input text-black ring-offset-primary-500
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1
        ${error 
          ? 'error border-red-600 placeholder-red-600 focus:ring-red-600 focus:border-red-600 ring-2 ring-red-600'
          : 'border-gray-300 placeholder-gray-700 focus:border-primary-600 focus:ring-primary-600'
        }`, 
        className
      )}
      { ...props }
    />
    { children }
  </div>
}

export default FormInput
