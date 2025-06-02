
import type { FC, JSX } from 'react'
import { useNavigate } from 'react-router'

import UserRegisterForm from '@/interface/components/user/form/register'

const RegisterPage: FC = (): JSX.Element => {
  const navigate = useNavigate()

  const handleFormSubmit = (result: boolean) => result && navigate('/')
  
  return <section className='flex flex-col w-[96%] max-w-[400px] m-auto border rounded-lg text-white'>
    <UserRegisterForm className='py-12' onSubmit={handleFormSubmit} />
  </section>
}

export default RegisterPage
