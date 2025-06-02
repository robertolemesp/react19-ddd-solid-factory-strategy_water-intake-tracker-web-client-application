import { type FC, type JSX, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const Layout: FC = (): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    /* 
      This demo has no auth business rule and then its state, 
      we will ever initialize in the sign in route, but system's and routing architeture is ready to receive auth state and flow
    */
    navigate('/register')
  }, [])
  
  return <main className='min-h-screen flex flex-col py-6 px-3 sm:px-6'>
    <Outlet />
  </main>
}

export default Layout
