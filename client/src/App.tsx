import { useState, useEffect } from 'react'
import './App.css'
import Authentication from './components/authentication/Authentication'
import LogoutBtn from './components/LogoutBtn'
import Dashboard from './components/dashboard/Dashboard'
import axios from 'axios'
import { Button } from './components/ui/button'
import { ITransaction } from './interfaces/ITransaction'


// Styling: https://mui.com/material-ui/

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<ITransaction[]>()

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated && localStorage.getItem("access_token") !== null) {
      getUserData()
    }
    return () => {

    }
  }, [isAuthenticated])

  const getUserData = () => {
    let access_token = localStorage.getItem("access_token")
    axios.get("http://127.0.0.1:8000/transactions/get_all_user_transactions/", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      console.log(response.data)
      setUserData(response.data)
    })
  }

  return (
    <>
      {isAuthenticated == true ? <Dashboard userData={userData}/> : <Authentication setIsAuthenticated={setIsAuthenticated} />}
      <Button onClick={getUserData}></Button>
    </>
  )
}

export default App
