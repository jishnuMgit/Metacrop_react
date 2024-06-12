import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ApiClientProvider, CreateAxiosDefaults } from 'useipa'
import '@/App.css'
import '@fontsource/montserrat'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import Env from './config/env'
import { ThemeProvider } from '@material-tailwind/react'

function App() {
  const client: CreateAxiosDefaults = {
    baseURL: Env.VITE_BASE_URL,
    withCredentials: true,
  }

  return (
    <Provider store={store}>
      <ApiClientProvider client={client}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApiClientProvider>
    </Provider>
  )
}

export default App
