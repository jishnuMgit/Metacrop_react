import { Footer } from '@/widgets/layout'
import { NavBar } from './ui'
import { Outlet } from 'react-router-dom'
import { UpIcon } from './icons'

function Layout() {
  return (
    <>
      <div className="relative">
        <NavBar />
        <Outlet />
        <Footer />
        <UpIcon />
      </div>
    </>
  )
}

export default Layout
