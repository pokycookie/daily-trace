import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/main-layout'
import mainRoute from '@/routes/main-route'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: mainRoute,
  },
])

export default router
