import { getCookie } from '@/utils/helpers'
import { redirect } from 'react-router-dom'

export const authLoader = () => {
  const isLoggedIn = getCookie('logged_in')
  if (isLoggedIn) {
    return redirect('/')
  }
  return true
}
