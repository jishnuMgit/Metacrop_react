import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Login, Home } from '@/pages'
import { Center, NavBar } from '@/components/ui'
import '@/App.css'
import '@fontsource/montserrat'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

function App() {
  const isLoggedIn = true
  return (
    <Provider store={store}>
      <NavBar />
      <>
        {isLoggedIn ? (
          <Home />
        ) : (
          <Center className="h-screen">
            <Login />
          </Center>
        )}
      </>
    </Provider>
  )
}

export default App
