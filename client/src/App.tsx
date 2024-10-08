import { useState, useEffect } from 'react'
import './App.css'
import Authentication from './components/authentication/Authentication'


// Styling: https://mui.com/material-ui/

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {

    return () => {

    }
  }, [])


  return (
    <>
      {isAuthenticated == true ? null : <Authentication setIsAuthenticated={setIsAuthenticated} />}

    </>
  )
}

export default App
