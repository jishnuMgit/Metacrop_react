import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import {
  Sales,
  Home,
  Error,
  Login,
  Settings,
  SalesList,
  SalesReturn,
} from '@/pages'
import Layout from '../components/Layout'
import { authLoader } from './loader'
import { Sale } from '@/pages/sales'
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
            path: 'sales',
            Component: Sale,
            children: [
              {
                path: 'list',
                Component: SalesList,
              },
              { path: 'pos', Component: Sales },
              { path: 'return', Component: SalesReturn },
            ],
            ErrorBoundary: Error,
          },
          { path: '/settings', Component: Settings },
          { path: '/login', Component: Login, loader: authLoader },
        ],
      },
    ],
  },
])
