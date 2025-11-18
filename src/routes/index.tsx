import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import { Home, Error, Login } from '@/pages'
import Layout from '../components/Layout'
import { authLoader, rootLoader } from './loader'
import {
  Sale,
  SaleIndex,
  SalesList,
  SalesReturnList,
  AddSalesReturn,
  SalesReturn,
  Pos,
} from '@/pages/sales'
// import path from 'path'
import Attendance from '@/pages/sales/Attendance'
import Customer from '@/pages/customer/Customer'
import Reconciliation from '@/components/Reconciliation/Reconciliation'
import PaymentVoucher from '@/pages/PaymentVoucher/PaymentVoucher'

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
              { path: 'pos', Component: Pos },
              {
                path: 'return',
                Component: SalesReturnList,
              },
              { path: 'return/:id', Component: SalesReturn },
              { path: 'add-return', Component: AddSalesReturn },
              { path: ':id', Component: Sale },
            ],
            errorElement: <Error />,
          },
          {
            path:"attendance",
            Component:Attendance
          },
          {
path:"reconciliation",
Component:Reconciliation
          },
          {
path:"PaymentVoucher",
Component:PaymentVoucher
          },
          {
            path:"/customer/Customer",
            Component:Customer
          }

        ],
      },
    ],
  },
  { path: 'login', Component: Login, loader: authLoader },
])
