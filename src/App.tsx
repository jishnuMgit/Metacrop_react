import { Provider } from 'react-redux'
import { store } from './redux/store'
import '@/App.css'
import '@fontsource/montserrat'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './components/routes'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
