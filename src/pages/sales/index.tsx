import { useMatch, Navigate, Outlet } from 'react-router-dom'

export { default as Sales } from './Pos'
export { default as SalesList } from './SalesList'
export { default as SalesReturn } from './SalesReturn'
export { default as Sale } from './Sale'

export function SaleIndex() {
  console.log(useMatch('/sales'))

  if (useMatch('/sales')) {
    return (
      <>
        <Navigate to={'/sales/pos'} />
      </>
    )
  }
  return (
    <>
      <Outlet />
    </>
  )
}
