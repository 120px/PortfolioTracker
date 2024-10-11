import { useState, useEffect } from 'react'
import './App.css'
import Authentication from './components/authentication/Authentication'
import LogoutBtn from './components/LogoutBtn'
import Dashboard from './components/dashboard/Dashboard'


// Styling: https://mui.com/material-ui/

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {

    return () => {

    }
  }, [])


  return (
    <>
      {isAuthenticated == true ? <Dashboard/> : <Authentication setIsAuthenticated={setIsAuthenticated} />}

    </>
  )
}

export default App
