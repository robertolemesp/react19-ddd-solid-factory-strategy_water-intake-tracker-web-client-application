import type { FC, JSX, PropsWithChildren } from 'react'

const FormFieldError: FC<PropsWithChildren> = ({ children }): JSX.Element => 
  <p className='text-red-600 dark:text-red-500'>
    { children }
  </p>

export default FormFieldError
