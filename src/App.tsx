import Login from './pages/Login'
import './App.css'
import Center from './components/Center'
import Home from './pages/Home'

function App() {
  const isLoggedIn = true
  return (
    <>
      {isLoggedIn ? (
        <Home />
      ) : (
        <Center className="h-screen">
          <Login />
        </Center>
      )}
    </>
  )
}

export default App
