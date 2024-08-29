import { Button, Hr } from '@/components/ui'
import Sidebar from '@/components/ui/Sidebar'
import { isDarkMode, removeCookie, setDarkMode } from '@/utils/helpers'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { Switch } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'useipa'

function Settings({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) {
  const [dark, setDark] = useState(isDarkMode())
  const navigate = useNavigate()
  const { success, mutate, fetching } = useApi()

  const handleLogout = () => {
    removeCookie('logged_in')
    mutate('/auth/logout')
  }

  const toggleDarkMode = () => {
    setDark(!dark)
    setDarkMode(!dark)
  }
  useEffect(() => {
    if (success) {
      return navigate('/login')
    }
  }, [success])

  return (
    <Sidebar side="right" handleClose={handleClose} open={isOpen}>
      <>
        <div className="flex h-14"></div>
        <div className="flex ">
          {/* <Typography>Dark Mode</Typography> */}
          <Switch
            labelProps={{ className: 'dark:text-dark-text-color' }}
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
