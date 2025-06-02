import type { FC, JSX, PropsWithChildren } from 'react'

import { mergeClassNames } from '@/utils/classname'

import Spinner from '@/interface/components/_shared/ui/spinner'

interface FormSubmitProps extends PropsWithChildren {
  className?: string
  isSubmittingSpinnerColored?: boolean
  isSubmitting?: boolean
}

const FormSubmit: FC<FormSubmitProps> = ({ className, isSubmittingSpinnerColored = false, isSubmitting, children }): JSX.Element => 
  <button
    type='submit' 
    disabled={isSubmitting}
    className={mergeClassNames(
      'flex items-center justify-center w-32 h-min sm:h-12 p-4 sm:p-2 font-bold rounded-lg text-sm text-center text-white bg-primary-600 focus:outline-none',
      className
    )}
  >
    { isSubmitting ? <Spinner variant='small' colored={isSubmittingSpinnerColored} /> : children }
  </button>

export default FormSubmit
