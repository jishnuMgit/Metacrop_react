import { Hr } from '@/components/ui'
import Sidebar from '@/components/ui/Sidebar'
import { removeCookie } from '@/utils/helpers'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { Button } from '@material-tailwind/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'useipa'

function Settings({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: () => void
}) {
  const navigate = useNavigate()
  const { success, mutate, fetching } = useApi()

  const handleLogout = () => {
    mutate('/auth/logout')
    removeCookie('logged_in')
  }
  useEffect(() => {
    if (success) {
      return navigate('/')
    }
  }, [success])

  return (
    <Sidebar side="right" handleClose={handleClose} open={isOpen}>
      <>
        <div className="flex h-14"></div>
        <div className="absolute bottom-3 w-full">
          <Hr />
          <Button
            onClick={handleLogout}
            className="flex items-center gap-3"
            size="sm"
            loading={fetching}
          >
            <ArrowLeftStartOnRectangleIcon
              strokeWidth={2}
              className="h-4 w-4"
            />
            Logout
          </Button>
        </div>
      </>
    </Sidebar>
  )
}

export default Settings
