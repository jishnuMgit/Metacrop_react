import { getCookie, isDarkMode, setDarkMode } from '@/utils/helpers'
import { redirect } from 'react-router-dom'

export const authLoader = () => {
  const isLoggedIn = getCookie('logged_in')
  if (isLoggedIn) {
    return redirect('/')
  }
  return true
}

export const rootLoader = () => {
  const isLoggedIn = getCookie('logged_in')
  setDarkMode(isDarkMode())

  if (!isLoggedIn) {
    return redirect('/login')
  }
  return true
}
