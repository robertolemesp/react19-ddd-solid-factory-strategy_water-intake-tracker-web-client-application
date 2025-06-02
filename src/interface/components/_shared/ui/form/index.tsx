  import type { PropsWithChildren, JSX, FormEvent, RefObject } from 'react'
  import { useForm, FormProvider, FieldValues } from 'react-hook-form'

  import FormSubmit from './submit'

  export interface FormProps<T> extends PropsWithChildren { 
    className?: string
    ref?: RefObject<HTMLFormElement | null>
    isSubmitting?: boolean
    isSubmittingSpinnerColored?: boolean
    submitClassName?: string;
    submitTitle?: string;
    onChange?: (event: FormEvent<HTMLFormElement>) => void
    onSubmit: (data: T) => void | Promise<void>
  }


  const Form = <T extends FieldValues>({ className, submitClassName, submitTitle, onSubmit, children }: FormProps<T>): JSX.Element => {
    const methods = useForm<T>()
    const { handleSubmit, formState: { isSubmitting } } = methods

    const handleFormSubmit = async (data: T) => {
      if (onSubmit) 
        await onSubmit(data)
    }

    return (
      <FormProvider {...methods}>
        <form className={className} onSubmit={handleSubmit(handleFormSubmit)}>
          {children}
          <FormSubmit className={submitClassName} isSubmitting={isSubmitting}>
            {submitTitle || 'Submit'}
          </FormSubmit>
        </form>
      </FormProvider>
    )
  }

  export default Form
