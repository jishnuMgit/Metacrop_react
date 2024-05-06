import Login from './pages/Login'
import Center from './components/Center'
import Home from './pages/Home'
import './App.css'

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
