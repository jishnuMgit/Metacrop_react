import { Footer } from '@/widgets/layout'
import { NavBar } from './ui'
import { Outlet } from 'react-router-dom'
import UpIcon from './icons/UpIcon'

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <UpIcon />
    </>
  )
}

export default Layout
