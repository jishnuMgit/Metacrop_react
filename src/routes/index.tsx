import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import { Sales, Home, Error, Login, Settings } from '@/pages'
import Layout from '../components/Layout'
import { authLoader } from './loader'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', Component: Home },
          {
            path: '/sales',
            Component: Sales,
            ErrorBoundary: Error,
          },
          { path: '/settings', Component: Settings },
          { path: '/login', Component: Login, loader: authLoader },
        ],
      },
    ],
  },
])
