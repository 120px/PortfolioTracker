import { useState, useEffect } from 'react'
import './App.css'
import Authentication from './components/authentication/Authentication'
import Dashboard from './components/dashboard/Dashboard'
import axios from 'axios'
import { useUserData } from './components/context/SetUserDataContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    if (isAuthenticated && localStorage.getItem("access_token") !== null) {
      getUserData()
    }
    return () => {

    }
  }, [isAuthenticated])

  const getUserData = () => {
    let access_token = localStorage.getItem("access_token")
    axios.get("http://127.0.0.1:8000/transactions/get_all_user_data/", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      setUserData(response.data)
    })
  }

  return (
    <>
      {isAuthenticated == true && userData !== undefined ? <Dashboard userData={userData} /> : <Authentication setIsAuthenticated={setIsAuthenticated} />}
    </>
  )
}

export default App
