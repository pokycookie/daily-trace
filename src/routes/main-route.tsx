import MainView from '@/views/main-view'
import { RouteObject } from 'react-router-dom'

const mainRoute: RouteObject[] = [
  {
    path: '/',
    element: <MainView />,
  },
]

export default mainRoute
