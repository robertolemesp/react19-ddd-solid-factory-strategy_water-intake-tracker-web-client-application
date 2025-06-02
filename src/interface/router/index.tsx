import type { FC, JSX } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from '@/interface/layout'

import MainPage from '@/interface/pages/main'
import HistoryPage from '@/interface/pages/history'
import RegisterPage from '@/interface/pages/register'
import NotFoundPage from '@/interface/pages/not-found'

const Router: FC = (): JSX.Element =>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='history' element={<HistoryPage />} />
      </Route>
      <Route element={<Layout />}> { /* ready for a AuthLayout */}
        <Route path='register' element={<RegisterPage />} /> 
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>

export default Router
