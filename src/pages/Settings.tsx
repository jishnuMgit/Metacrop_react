import { Modal, Button } from '@/components/ui'
import { removeCookie } from '@/utils/helpers'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const [isOpen, setOpen] = useState(true)
  const navigate = useNavigate()
  const handleLogout = () => {
    removeCookie('logged_in')
    return navigate('/')
  }
  const handleClose = () => {
    setOpen(false)
    return navigate('/sales')
  }
  if (!isOpen) {
    return null
  }
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} center>
      <Button onClick={handleLogout}>Logout</Button>
    </Modal>
  )
}

export default Settings
