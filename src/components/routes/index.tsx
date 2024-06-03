import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import { Sales, Home } from '@/pages'
import Layout from '../Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/sales', element: <Sales /> },
        ],
      },
    ],
  },
])
