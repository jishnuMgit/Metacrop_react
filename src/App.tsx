import Login from './pages/Login'
import Center from './components/Center'
import Home from './pages/Home'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  const isLoggedIn = true
  return (
    <Provider store={store}>
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
