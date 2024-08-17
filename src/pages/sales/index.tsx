import { links } from '@/config/constants'
import { useMatch, Navigate, Outlet } from 'react-router-dom'

export { default as AddSalesReturn } from './AddSalesReturn'
export { default as Pos } from './Pos'
export { default as SalesList } from './SalesList'
export { default as SalesReturnList } from './SalesReturnList'
export { default as Sale } from './Sale'
export { default as SalesReturn } from './SalesReturn'

export function SaleIndex() {
  console.log(useMatch('/sales'))

  if (useMatch('/sales')) {
    return (
      <>
        <Navigate to={links.POS} />
      </>
    )
  }
  return (
    <>
      <Outlet />
    </>
  )
}
