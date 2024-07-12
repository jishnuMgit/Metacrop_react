import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import { Sales, Home, Error, Login, SalesList, SalesReturn } from '@/pages'
import Layout from '../components/Layout'
import { authLoader, rootLoader } from './loader'
import { Sale, SaleIndex } from '@/pages/sales'

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', Component: Home },
          {
            path: 'sales',
            Component: SaleIndex,
            children: [
              {
                path: 'list',
                Component: SalesList,
              },
              { path: 'pos', Component: Sales },
              { path: 'return', Component: SalesReturn },
              { path: ':id', Component: Sale },
            ],
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  { path: 'login', Component: Login, loader: authLoader },
])
