import { Button, Hr } from '@/components/ui'
import Sidebar from '@/components/ui/Sidebar'
import { removeCookie, setDarkMode } from '@/utils/helpers'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { Switch } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'useipa'

function Settings({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) {
  const [dark, setDark] = useState(true)
  const navigate = useNavigate()
  const { success, mutate, fetching } = useApi()

  const handleLogout = () => {
    removeCookie('logged_in')
    mutate('/auth/logout')
  }
  const [htmlElement] = document.getElementsByTagName('html')

  const toggleDarkMode = () => {
    setDark(!dark)
    setDarkMode(!dark)
  }
  useEffect(() => {
    if (success) {
      return navigate('/login')
    }
  }, [success])

  useEffect(() => {
    if (dark) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <Sidebar side="right" handleClose={handleClose} open={isOpen}>
      <>
        <div className="flex h-14"></div>
        <div className="flex ">
          {/* <Typography>Dark Mode</Typography> */}
          <Switch
            crossOrigin={''}
            checked={dark}
            label={'Dark Mode'}
            color={'red'}
            onChange={toggleDarkMode}
          />
        </div>
        <div className="absolute bottom-3 w-full">
          <Hr />
          <Button
            onClick={handleLogout}
            className="flex items-center gap-3"
            size="sm"
            loading={fetching}
          >
            <ArrowLeftStartOnRectangleIcon strokeWidth={2} className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </>
    </Sidebar>
  )
}

export default Settings
