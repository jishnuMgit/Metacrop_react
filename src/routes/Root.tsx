import { Login } from '@/pages'
import { Center } from '../components/ui'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getCookie } from '@/utils/helpers'

function Root() {
  const isLoggedIn = getCookie('logged_in')
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [])

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
