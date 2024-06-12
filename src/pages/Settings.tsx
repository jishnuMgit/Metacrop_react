import { Hr } from '@/components/ui'
import Sidebar from '@/components/ui/Sidebar'
import { removeCookie } from '@/utils/helpers'
import { Button } from 'flowbite-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'useipa'

function Settings({
  isOpen,
  handleClose,
}: {
  isOpen?: boolean
  handleClose?: () => void
}) {
  const navigate = useNavigate()
  const { success, mutate } = useApi()

  const handleLogout = () => {
    mutate('/auth/logout')
  }
  useEffect(() => {
    if (success) {
      removeCookie('logged_in')
      return navigate('/')
    }
  }, [success])

  if (!isOpen) {
    return null
  }
  return (
    <Sidebar side="right" handleClose={handleClose}>
      <>
        <div className="flex h-14"></div>
        <div className="absolute bottom-0 w-full">
          <Hr />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </>
    </Sidebar>
  )
}

export default Settings
