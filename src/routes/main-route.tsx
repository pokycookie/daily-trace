import paths from '@/configs/paths'
import MainView from '@/views/main-view'
import TimeLineView from '@/views/timeline-view'
import { RouteObject } from 'react-router-dom'

const mainRoute: RouteObject[] = [
  {
    path: '/',
    element: <MainView />,
  },
  {
    path: paths.view.timeline,
    element: <TimeLineView />,
  },
]

export default mainRoute
