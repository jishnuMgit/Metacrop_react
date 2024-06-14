import { Footer } from '@/widgets/layout'
import { NavBar } from './ui'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
