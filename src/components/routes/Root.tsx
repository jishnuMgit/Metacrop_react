import { Login } from '@/pages'
import { Center } from '../ui'
import { Outlet } from 'react-router-dom'

function Root() {
  const isLoggedIn = true
  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Center className="h-screen">
          <Login />
        </Center>
      )}
    </>
  )
}

export default Root
