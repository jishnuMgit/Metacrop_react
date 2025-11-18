import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ApiClientProvider, CreateAxiosDefaults } from 'useipa'
import '@/App.css'
import '@fontsource/montserrat'
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import Env from './config/env'
import { ThemeProvider } from '@material-tailwind/react'
import { ToastContainer } from 'react-toastify';

function App() {
  const client: CreateAxiosDefaults = {
    baseURL: Env.VITE_BASE_URL,
    withCredentials: true,
  }

  return (
    <Provider store={store}>
       <ToastContainer
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
      <ApiClientProvider client={client}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApiClientProvider>
    </Provider>
  )
}

export default App
