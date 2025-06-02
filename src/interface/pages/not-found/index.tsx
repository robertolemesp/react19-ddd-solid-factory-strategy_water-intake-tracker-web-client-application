import { Link } from 'react-router'

const NotFoundPage = () => 
  <main className='flex items-center justify-center min-h-screen'>
    <section className='flex flex-col items-center'>
      <h1 className='fluid-text-9xl font-bold text-gray-600 mb-8'>404</h1>
      <h2 className='text-3xl text-gray-600 mb-4'>Página Não Encontrada</h2>
      <p className='text-gray-500 mb-8'>A página navegada não foi encontrada</p>
      <Link to='/' className='inline-block px-8 py-3 text-black rounded-md'>Voltar</Link>
    </section>
  </main>
 
export default NotFoundPage
