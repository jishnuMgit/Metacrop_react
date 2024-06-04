import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import '@/App.css'
import '@fontsource/montserrat'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import { ApiClientProvider, CreateAxiosDefaults } from 'useipa'

function App() {
  const client: CreateAxiosDefaults = {
    baseURL: 'http://localhost:3001/api/v1',
  }
  return (
    <Provider store={store}>
      <ApiClientProvider client={client}>
        <RouterProvider router={router} />
      </ApiClientProvider>
    </Provider>
  )
}

export default App
